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


using grpc::ServerBuilder;

namespace grpc {
namespace testing {

namespace {
std::unique_ptr<ServerBuilder> DefaultCreateQpsServerBuilder() {
  return std::unique_ptr<ServerBuilder>(new ServerBuilder());
}

std::function<std::unique_ptr<ServerBuilder>()> g_create_qps_server_builder =
    DefaultCreateQpsServerBuilder;
}  // namespace

std::unique_ptr<ServerBuilder> CreateQpsServerBuilder() {
  return g_create_qps_server_builder();
}

void SetCreateQpsServerBuilderFunc(
    std::function<std::unique_ptr<ServerBuilder>()> create_qps_server_builder) {
  g_create_qps_server_builder = std::move(create_qps_server_builder);
}

}  // namespace testing
}  // namespace grpc
