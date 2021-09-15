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

#define GRPC_QPS_SERVER_BUILDER_H

#include <functional>
#include <memory>

#include <grpcpp/server_builder.h>

namespace grpc {
namespace testing {

// CreateQpsServerBuilder creates a new ServerBuilder.
// This uses the "create ServerBuilder" func that was set
// in SetCreateQpsServerBuilderFunc if one has been set,
// otherwise, this defaults to creating a new ServerBuilder
// with only its default constructor.
std::unique_ptr<ServerBuilder> CreateQpsServerBuilder();

// SetCreateQpsServerBuilderFunc sets a function to use to create new
// ServerBuilders in "CreateQpsServerBuilder". It can be used to modify options
// that the server is built with.
void SetCreateQpsServerBuilderFunc(
    std::function<std::unique_ptr<ServerBuilder>()>);

}  // namespace testing
}  // namespace grpc

#endif  // GRPC_QPS_SERVER_BUILDER_H
