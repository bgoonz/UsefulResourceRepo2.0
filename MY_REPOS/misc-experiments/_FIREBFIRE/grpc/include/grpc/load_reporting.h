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

#define GRPC_LOAD_REPORTING_H

#include <grpc/impl/codegen/port_platform.h>

#ifdef __cplusplus
extern "C" {
#endif

/** Metadata key for the gRPC LB load balancer token.
 *
 * The value corresponding to this key is an opaque token that is given to the
 * frontend as part of each pick; the frontend sends this token to the backend
 * in each request it sends when using that pick. The token is used by the
 * backend to verify the request and to allow the backend to report load to the
 * gRPC LB system. */
#define GRPC_LB_TOKEN_MD_KEY "lb-token"

/** Metadata key for gRPC LB cost reporting.
 *
 * The value corresponding to this key is an opaque binary blob reported by the
 * backend as part of its trailing metadata containing cost information for the
 * call. */
#define GRPC_LB_COST_MD_KEY "lb-cost-bin"

#ifdef __cplusplus
}
#endif

#endif /* GRPC_LOAD_REPORTING_H */
