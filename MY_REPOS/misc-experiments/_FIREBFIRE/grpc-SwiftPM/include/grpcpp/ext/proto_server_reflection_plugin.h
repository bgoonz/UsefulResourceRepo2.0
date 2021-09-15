/*
 *
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
EFLECTION_PLUGIN_H
#define GRPCPP_EXT_PROTO_SERVER_REFLECTION_PLUGIN_H

#include <grpcpp/ext/proto_server_reflection_plugin_impl.h>

namespace grpc {
namespace reflection {

typedef ::grpc_impl::reflection::ProtoServerReflectionPlugin
    ProtoServerReflectionPlugin;

static inline void InitProtoReflectionServerBuilderPlugin() {
  ::grpc_impl::reflection::InitProtoReflectionServerBuilderPlugin();
}

}  // namespace reflection
}  // namespace grpc

#endif  // GRPCPP_EXT_PROTO_SERVER_REFLECTION_PLUGIN_H
