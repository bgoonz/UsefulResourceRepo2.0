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
ENT_CHANNEL_PROXY_MAPPER_REGISTRY_H
#define GRPC_CORE_EXT_FILTERS_CLIENT_CHANNEL_PROXY_MAPPER_REGISTRY_H

#include <grpc/support/port_platform.h>

#include "src/core/ext/filters/client_channel/proxy_mapper.h"

namespace grpc_core {

class ProxyMapperRegistry {
 public:
  static void Init();
  static void Shutdown();

  /// Registers a new proxy mapper.
  /// If \a at_start is true, the new mapper will be at the beginning of
  /// the list.  Otherwise, it will be added to the end.
  static void Register(bool at_start,
                       std::unique_ptr<ProxyMapperInterface> mapper);

  static bool MapName(const char* server_uri, const grpc_channel_args* args,
                      char** name_to_resolve, grpc_channel_args** new_args);

  static bool MapAddress(const grpc_resolved_address& address,
                         const grpc_channel_args* args,
                         grpc_resolved_address** new_address,
                         grpc_channel_args** new_args);
};

}  // namespace grpc_core

#endif /* GRPC_CORE_EXT_FILTERS_CLIENT_CHANNEL_PROXY_MAPPER_REGISTRY_H */
