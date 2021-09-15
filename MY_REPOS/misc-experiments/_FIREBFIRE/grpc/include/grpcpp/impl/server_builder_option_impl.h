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
R_OPTION_IMPL_H
#define GRPCPP_IMPL_SERVER_BUILDER_OPTION_IMPL_H

#include <map>
#include <memory>

#include <grpcpp/impl/server_builder_plugin.h>
#include <grpcpp/support/channel_arguments.h>

namespace grpc_impl {

/// Interface to pass an option to a \a ServerBuilder.
class ServerBuilderOption {
 public:
  virtual ~ServerBuilderOption() {}
  /// Alter the \a ChannelArguments used to create the gRPC server.
  virtual void UpdateArguments(grpc::ChannelArguments* args) = 0;
  /// Alter the ServerBuilderPlugin map that will be added into ServerBuilder.
  virtual void UpdatePlugins(
      std::vector<std::unique_ptr<grpc::ServerBuilderPlugin>>* plugins) = 0;
};

}  // namespace grpc_impl

#endif  // GRPCPP_IMPL_SERVER_BUILDER_OPTION_IMPL_H
