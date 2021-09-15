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

#define TRICKLE_ENDPOINT_H

#include "src/core/lib/iomgr/endpoint.h"

grpc_endpoint* grpc_trickle_endpoint_create(grpc_endpoint* wrap,
                                            double bytes_per_second);

/* Allow up to \a bytes through the endpoint. Returns the new backlog. */
size_t grpc_trickle_endpoint_trickle(grpc_endpoint* endpoint);

size_t grpc_trickle_get_backlog(grpc_endpoint* endpoint);

#endif
