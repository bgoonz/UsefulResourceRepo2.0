/*
 *
 * Copyright 2018 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
orm.h>

#include "src/core/ext/transport/chttp2/client/authority.h"

grpc_channel_args* grpc_default_authority_add_if_not_present(
    const grpc_channel_args* args) {
  const bool has_default_authority =
      grpc_channel_args_find(args, GRPC_ARG_DEFAULT_AUTHORITY) != nullptr;
  grpc_arg new_args[1];
  size_t num_new_args = 0;
  grpc_core::UniquePtr<char> default_authority;
  if (!has_default_authority) {
    const grpc_arg* server_uri_arg =
        grpc_channel_args_find(args, GRPC_ARG_SERVER_URI);
    const char* server_uri_str = grpc_channel_arg_get_string(server_uri_arg);
    GPR_ASSERT(server_uri_str != nullptr);
    default_authority =
        grpc_core::ResolverRegistry::GetDefaultAuthority(server_uri_str);
    GPR_ASSERT(default_authority != nullptr);
    new_args[num_new_args++] = grpc_channel_arg_string_create(
        const_cast<char*>(GRPC_ARG_DEFAULT_AUTHORITY), default_authority.get());
  }
  return grpc_channel_args_copy_and_add(args, new_args, num_new_args);
}
