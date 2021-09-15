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
ENT_CHANNEL_CLIENT_CHANNEL_FACTORY_H
#define GRPC_CORE_EXT_FILTERS_CLIENT_CHANNEL_CLIENT_CHANNEL_FACTORY_H

#include <grpc/support/port_platform.h>

#include <grpc/impl/codegen/grpc_types.h>

#include "src/core/ext/filters/client_channel/subchannel.h"

namespace grpc_core {

class ClientChannelFactory {
 public:
  virtual ~ClientChannelFactory() = default;

  // Creates a subchannel with the specified args.
  virtual Subchannel* CreateSubchannel(const grpc_channel_args* args) = 0;

  // Returns a channel arg containing the specified factory.
  static grpc_arg CreateChannelArg(ClientChannelFactory* factory);

  // Returns the factory from args, or null if not found.
  static ClientChannelFactory* GetFromChannelArgs(
      const grpc_channel_args* args);
};

}  // namespace grpc_core

#endif /* GRPC_CORE_EXT_FILTERS_CLIENT_CHANNEL_CLIENT_CHANNEL_FACTORY_H */
