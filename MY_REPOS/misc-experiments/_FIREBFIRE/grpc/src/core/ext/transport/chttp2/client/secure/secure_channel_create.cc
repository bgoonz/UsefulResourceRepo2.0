/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
orm.h>

#include <grpc/grpc.h>

#include <string.h>

#include <grpc/support/alloc.h>
#include <grpc/support/string_util.h>

#include "src/core/ext/filters/client_channel/client_channel.h"
#include "src/core/ext/filters/client_channel/resolver_registry.h"
#include "src/core/ext/transport/chttp2/client/chttp2_connector.h"
#include "src/core/lib/channel/channel_args.h"
#include "src/core/lib/gprpp/memory.h"
#include "src/core/lib/iomgr/sockaddr_utils.h"
#include "src/core/lib/security/credentials/credentials.h"
#include "src/core/lib/security/security_connector/security_connector.h"
#include "src/core/lib/slice/slice_internal.h"
#include "src/core/lib/surface/api_trace.h"
#include "src/core/lib/surface/channel.h"
#include "src/core/lib/transport/authority_override.h"
#include "src/core/lib/uri/uri_parser.h"

namespace grpc_core {

class Chttp2SecureClientChannelFactory : public ClientChannelFactory {
 public:
  Subchannel* CreateSubchannel(const grpc_channel_args* args) override {
    grpc_channel_args* new_args = GetSecureNamingChannelArgs(args);
    if (new_args == nullptr) {
      gpr_log(GPR_ERROR,
              "Failed to create channel args during subchannel creation.");
      return nullptr;
    }
    Subchannel* s =
        Subchannel::Create(MakeOrphanable<Chttp2Connector>(), new_args);
    grpc_channel_args_destroy(new_args);
    return s;
  }

 private:
  static grpc_channel_args* GetSecureNamingChannelArgs(
      const grpc_channel_args* args) {
    grpc_channel_credentials* channel_credentials =
        grpc_channel_credentials_find_in_args(args);
    if (channel_credentials == nullptr) {
      gpr_log(GPR_ERROR,
              "Can't create subchannel: channel credentials missing for secure "
              "channel.");
      return nullptr;
    }
    // Make sure security connector does not already exist in args.
    if (grpc_security_connector_find_in_args(args) != nullptr) {
      gpr_log(GPR_ERROR,
              "Can't create subchannel: security connector already present in "
              "channel args.");
      return nullptr;
    }
    // Find the authority to use in the security connector.
    // First, check the authority override channel arg.
    // Otherwise, get it from the server name used to construct the
    // channel.
    grpc_core::UniquePtr<char> authority(
        gpr_strdup(FindAuthorityOverrideInArgs(args)));
    if (authority == nullptr) {
      const char* server_uri_str =
          grpc_channel_args_find_string(args, GRPC_ARG_SERVER_URI);
      GPR_ASSERT(server_uri_str != nullptr);
      authority = ResolverRegistry::GetDefaultAuthority(server_uri_str);
    }
    grpc_arg args_to_add[2];
    size_t num_args_to_add = 0;
    if (grpc_channel_args_find(args, GRPC_ARG_DEFAULT_AUTHORITY) == nullptr) {
      // If the channel args don't already contain GRPC_ARG_DEFAULT_AUTHORITY,
      // add the arg, setting it to the value just obtained.
      args_to_add[num_args_to_add++] = grpc_channel_arg_string_create(
          const_cast<char*>(GRPC_ARG_DEFAULT_AUTHORITY), authority.get());
    }
    grpc_channel_args* args_with_authority =
        grpc_channel_args_copy_and_add(args, args_to_add, num_args_to_add);
    // Create the security connector using the credentials and target name.
    grpc_channel_args* new_args_from_connector = nullptr;
    RefCountedPtr<grpc_channel_security_connector>
        subchannel_security_connector =
            channel_credentials->create_security_connector(
                /*call_creds=*/nullptr, authority.get(), args_with_authority,
                &new_args_from_connector);
    if (subchannel_security_connector == nullptr) {
      gpr_log(GPR_ERROR,
              "Failed to create secure subchannel for secure name '%s'",
              authority.get());
      grpc_channel_args_destroy(args_with_authority);
      return nullptr;
    }
    grpc_arg new_security_connector_arg =
        grpc_security_connector_to_arg(subchannel_security_connector.get());
    grpc_channel_args* new_args = grpc_channel_args_copy_and_add(
        new_args_from_connector != nullptr ? new_args_from_connector
                                           : args_with_authority,
        &new_security_connector_arg, 1);
    subchannel_security_connector.reset(DEBUG_LOCATION, "lb_channel_create");
    if (new_args_from_connector != nullptr) {
      grpc_channel_args_destroy(new_args_from_connector);
    }
    grpc_channel_args_destroy(args_with_authority);
    return new_args;
  }
};

namespace {

grpc_channel* CreateChannel(const char* target, const grpc_channel_args* args) {
  if (target == nullptr) {
    gpr_log(GPR_ERROR, "cannot create channel with NULL target name");
    return nullptr;
  }
  // Add channel arg containing the server URI.
  grpc_core::UniquePtr<char> canonical_target =
      ResolverRegistry::AddDefaultPrefixIfNeeded(target);
  grpc_arg arg = grpc_channel_arg_string_create(
      const_cast<char*>(GRPC_ARG_SERVER_URI), canonical_target.get());
  const char* to_remove[] = {GRPC_ARG_SERVER_URI};
  grpc_channel_args* new_args =
      grpc_channel_args_copy_and_add_and_remove(args, to_remove, 1, &arg, 1);
  grpc_channel* channel =
      grpc_channel_create(target, new_args, GRPC_CLIENT_CHANNEL, nullptr);
  grpc_channel_args_destroy(new_args);
  return channel;
}

}  // namespace

}  // namespace grpc_core

namespace {

grpc_core::Chttp2SecureClientChannelFactory* g_factory;
gpr_once g_factory_once = GPR_ONCE_INIT;

void FactoryInit() {
  g_factory = new grpc_core::Chttp2SecureClientChannelFactory();
}

}  // namespace

// Create a secure client channel:
//   Asynchronously: - resolve target
//                   - connect to it (trying alternatives as presented)
//                   - perform handshakes
grpc_channel* grpc_secure_channel_create(grpc_channel_credentials* creds,
                                         const char* target,
                                         const grpc_channel_args* args,
                                         void* reserved) {
  grpc_core::ExecCtx exec_ctx;
  GRPC_API_TRACE(
      "grpc_secure_channel_create(creds=%p, target=%s, args=%p, "
      "reserved=%p)",
      4, ((void*)creds, target, (void*)args, (void*)reserved));
  GPR_ASSERT(reserved == nullptr);
  grpc_channel* channel = nullptr;
  if (creds != nullptr) {
    // Add channel args containing the client channel factory and channel
    // credentials.
    gpr_once_init(&g_factory_once, FactoryInit);
    grpc_arg channel_factory_arg =
        grpc_core::ClientChannelFactory::CreateChannelArg(g_factory);
    grpc_arg args_to_add[] = {channel_factory_arg,
                              grpc_channel_credentials_to_arg(creds)};
    const char* arg_to_remove = channel_factory_arg.key;
    grpc_channel_args* new_args = grpc_channel_args_copy_and_add_and_remove(
        args, &arg_to_remove, 1, args_to_add, GPR_ARRAY_SIZE(args_to_add));
    new_args = creds->update_arguments(new_args);
    // Create channel.
    channel = grpc_core::CreateChannel(target, new_args);
    // Clean up.
    grpc_channel_args_destroy(new_args);
  }
  return channel != nullptr ? channel
                            : grpc_lame_client_channel_create(
                                  target, GRPC_STATUS_INTERNAL,
                                  "Failed to create secure client channel");
}
