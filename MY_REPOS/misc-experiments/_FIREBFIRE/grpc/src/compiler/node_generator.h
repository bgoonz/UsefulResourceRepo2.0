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
DE_GENERATOR_H
#define GRPC_INTERNAL_COMPILER_NODE_GENERATOR_H

#include "src/compiler/config.h"

namespace grpc_node_generator {

// Contains all the parameters that are parsed from the command line.
struct Parameters {
  // Sets the earliest version of nodejs that needs to be supported.
  int minimum_node_version;
};

std::string GenerateFile(const grpc::protobuf::FileDescriptor* file,
                         const Parameters& params);

}  // namespace grpc_node_generator

#endif  // GRPC_INTERNAL_COMPILER_NODE_GENERATOR_H
