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

#include <grpc/grpc.h>

#include "src/core/ext/xds/xds_channel.h"

namespace grpc_core {

grpc_channel_args* ModifyXdsChannelArgs(grpc_channel_args* args) {
  return args;
}

grpc_channel* CreateXdsChannel(const XdsBootstrap& bootstrap,
                               const grpc_channel_args& args,
                               grpc_error** error) {
  if (!bootstrap.server().channel_creds.empty()) {
    *error = GRPC_ERROR_CREATE_FROM_STATIC_STRING(
        "credential specified but gRPC not built with security");
    return nullptr;
  }
  return grpc_insecure_channel_create(bootstrap.server().server_uri.c_str(),
                                      &args, nullptr);
}

}  // namespace grpc_core
