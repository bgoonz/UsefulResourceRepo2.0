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

#define MOCK_ENDPOINT_H

#include <grpc/support/atm.h>

#include "src/core/lib/iomgr/endpoint.h"

/* The struct is refcounted, always use grpc_passthru_endpoint_stats_create and
 * grpc_passthru_endpoint_stats_destroy, rather then embedding it in your
 * objects by value. */
typedef struct {
  gpr_refcount refs;
  gpr_atm num_writes;
} grpc_passthru_endpoint_stats;

void grpc_passthru_endpoint_create(grpc_endpoint** client,
                                   grpc_endpoint** server,
                                   grpc_resource_quota* resource_quota,
                                   grpc_passthru_endpoint_stats* stats);

grpc_passthru_endpoint_stats* grpc_passthru_endpoint_stats_create();

void grpc_passthru_endpoint_stats_destroy(grpc_passthru_endpoint_stats* stats);

#endif
