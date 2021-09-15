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
P_GENERATOR_H
#define GRPC_INTERNAL_COMPILER_PHP_GENERATOR_H

#include "src/compiler/config.h"

namespace grpc_php_generator {

std::string GenerateFile(const grpc::protobuf::FileDescriptor* file,
                         const grpc::protobuf::ServiceDescriptor* service,
                         const std::string& class_suffix);

}  // namespace grpc_php_generator

#endif  // GRPC_INTERNAL_COMPILER_PHP_GENERATOR_H
