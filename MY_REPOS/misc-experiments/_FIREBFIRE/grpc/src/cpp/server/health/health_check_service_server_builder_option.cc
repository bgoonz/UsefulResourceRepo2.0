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
_service_server_builder_option.h>

namespace grpc {

HealthCheckServiceServerBuilderOption::HealthCheckServiceServerBuilderOption(
    std::unique_ptr<HealthCheckServiceInterface> hc)
    : hc_(std::move(hc)) {}
// Hand over hc_ to the server.
void HealthCheckServiceServerBuilderOption::UpdateArguments(
    ChannelArguments* args) {
  args->SetPointer(kHealthCheckServiceInterfaceArg, hc_.release());
}

void HealthCheckServiceServerBuilderOption::UpdatePlugins(
    std::vector<std::unique_ptr<ServerBuilderPlugin>>* /*plugins*/) {}

}  // namespace grpc
