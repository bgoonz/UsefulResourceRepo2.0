/*
 *
 * Copyright 2015-2016 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *

#define GRPC_CENSUS_H

#include <grpc/support/port_platform.h>

#include <grpc/grpc.h>

#ifdef __cplusplus
extern "C" {
#endif

/**
  A Census Context is a handle used by Census to represent the current tracing
  and stats collection information. Contexts should be propagated across RPC's
  (this is the responsibility of the local RPC system). */
typedef struct census_context census_context;

#ifdef __cplusplus
}
#endif

#endif /* GRPC_CENSUS_H */
