/*
 *
 * Copyright 2016 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
G_H
#define GRPCPP_IMPL_CODEGEN_CONFIG_H

#ifndef GRPC_CUSTOM_STRING
#include <string>
#define GRPC_CUSTOM_STRING std::string
#endif

/// The following macros are deprecated and appear only for users
/// with PB files generated using gRPC 1.0.x plugins. They should
/// not be used in new code
#define GRPC_OVERRIDE override  // deprecated
#define GRPC_FINAL final        // deprecated

namespace grpc {

typedef GRPC_CUSTOM_STRING string;

using std::to_string;

}  // namespace grpc

#endif  // GRPCPP_IMPL_CODEGEN_CONFIG_H
