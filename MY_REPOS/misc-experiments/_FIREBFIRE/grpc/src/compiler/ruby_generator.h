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
BY_GENERATOR_H
#define GRPC_INTERNAL_COMPILER_RUBY_GENERATOR_H

#include "src/compiler/config.h"

namespace grpc_ruby_generator {

std::string GetServices(const grpc::protobuf::FileDescriptor* file);

}  // namespace grpc_ruby_generator

#endif  // GRPC_INTERNAL_COMPILER_RUBY_GENERATOR_H
