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
HARP_GENERATOR_H
#define GRPC_INTERNAL_COMPILER_CSHARP_GENERATOR_H

#include "src/compiler/config.h"

#include <google/protobuf/compiler/csharp/csharp_names.h>

namespace grpc_csharp_generator {

grpc::string GetServices(const grpc::protobuf::FileDescriptor* file,
                         bool generate_client, bool generate_server,
                         bool internal_access);

}  // namespace grpc_csharp_generator

#endif  // GRPC_INTERNAL_COMPILER_CSHARP_GENERATOR_H
