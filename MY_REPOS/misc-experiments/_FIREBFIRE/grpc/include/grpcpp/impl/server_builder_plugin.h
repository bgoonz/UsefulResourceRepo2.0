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
R_PLUGIN_H
#define GRPCPP_IMPL_SERVER_BUILDER_PLUGIN_H

#include <memory>

#include <grpcpp/support/channel_arguments.h>
#include <grpcpp/support/config.h>

namespace grpc_impl {

class ServerInitializer;
}  // namespace grpc_impl
namespace grpc {

class ServerBuilder;

/// This interface is meant for internal usage only. Implementations of this
/// interface should add themselves to a \a ServerBuilder instance through the
/// \a InternalAddPluginFactory method.
class ServerBuilderPlugin {
 public:
  virtual ~ServerBuilderPlugin() {}
  virtual std::string name() = 0;

  /// UpdateServerBuilder will be called at an early stage in
  /// ServerBuilder::BuildAndStart(), right after the ServerBuilderOptions have
  /// done their updates.
  virtual void UpdateServerBuilder(ServerBuilder* /*builder*/) {}

  /// InitServer will be called in ServerBuilder::BuildAndStart(), after the
  /// Server instance is created.
  virtual void InitServer(grpc_impl::ServerInitializer* si) = 0;

  /// Finish will be called at the end of ServerBuilder::BuildAndStart().
  virtual void Finish(grpc_impl::ServerInitializer* si) = 0;

  /// ChangeArguments is an interface that can be used in
  /// ServerBuilderOption::UpdatePlugins
  virtual void ChangeArguments(const std::string& name, void* value) = 0;

  /// UpdateChannelArguments will be called in ServerBuilder::BuildAndStart(),
  /// before the Server instance is created.
  virtual void UpdateChannelArguments(ChannelArguments* /*args*/) {}

  virtual bool has_sync_methods() const { return false; }
  virtual bool has_async_methods() const { return false; }
};

}  // namespace grpc

#endif  // GRPCPP_IMPL_SERVER_BUILDER_PLUGIN_H
