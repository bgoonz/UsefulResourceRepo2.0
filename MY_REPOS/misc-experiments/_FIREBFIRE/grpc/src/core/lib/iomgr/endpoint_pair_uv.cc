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
orm.h>

#include "src/core/lib/iomgr/port.h"

#ifdef GRPC_UV

#include <stdlib.h>

#include <grpc/support/log.h>

#include "src/core/lib/iomgr/endpoint_pair.h"

grpc_endpoint_pair grpc_iomgr_create_endpoint_pair(const char* name,
                                                   grpc_channel_args* args) {
  grpc_endpoint_pair endpoint_pair;
  // TODO(mlumish): implement this properly under libuv
  GPR_ASSERT(false &&
             "grpc_iomgr_create_endpoint_pair is not suppoted with libuv");
  return endpoint_pair;
}

#endif /* GRPC_UV */
