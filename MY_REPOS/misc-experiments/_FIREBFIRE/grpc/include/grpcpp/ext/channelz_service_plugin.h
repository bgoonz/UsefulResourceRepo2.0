/*
 *
 * Copyright 2018 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
CE_PLUGIN_H
#define GRPCPP_EXT_CHANNELZ_SERVICE_PLUGIN_H

#include <grpcpp/ext/channelz_service_plugin_impl.h>

namespace grpc {
namespace channelz {
namespace experimental {

static inline void InitChannelzService() {
  ::grpc_impl::channelz::experimental::InitChannelzService();
}

}  // namespace experimental
}  // namespace channelz
}  // namespace grpc

#endif  // GRPCPP_EXT_CHANNELZ_SERVICE_PLUGIN_H
