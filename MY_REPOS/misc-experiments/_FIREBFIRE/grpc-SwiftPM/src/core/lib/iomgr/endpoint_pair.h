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
INT_PAIR_H
#define GRPC_CORE_LIB_IOMGR_ENDPOINT_PAIR_H

#include <grpc/support/port_platform.h>

#include "src/core/lib/iomgr/endpoint.h"

typedef struct {
  grpc_endpoint* client;
  grpc_endpoint* server;
} grpc_endpoint_pair;

grpc_endpoint_pair grpc_iomgr_create_endpoint_pair(const char* name,
                                                   grpc_channel_args* args);

#endif /* GRPC_CORE_LIB_IOMGR_ENDPOINT_PAIR_H */
