/*
 *
 * Copyright 2017 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
ENT_OPTION_H
#define GRPCPP_IMPL_CHANNEL_ARGUMENT_OPTION_H

#include <map>
#include <memory>

#include <grpcpp/impl/server_builder_option.h>
#include <grpcpp/support/channel_arguments.h>

namespace grpc {

std::unique_ptr<ServerBuilderOption> MakeChannelArgumentOption(
    const std::string& name, const std::string& value);
std::unique_ptr<ServerBuilderOption> MakeChannelArgumentOption(
    const std::string& name, int value);

}  // namespace grpc

#endif  // GRPCPP_IMPL_CHANNEL_ARGUMENT_OPTION_H
