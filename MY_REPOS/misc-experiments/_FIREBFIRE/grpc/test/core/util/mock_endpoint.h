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

#include "src/core/lib/iomgr/endpoint.h"

grpc_endpoint* grpc_mock_endpoint_create(void (*on_write)(grpc_slice slice),
                                         grpc_resource_quota* resource_quota);
void grpc_mock_endpoint_put_read(grpc_endpoint* mock_endpoint,
                                 grpc_slice slice);

#endif
