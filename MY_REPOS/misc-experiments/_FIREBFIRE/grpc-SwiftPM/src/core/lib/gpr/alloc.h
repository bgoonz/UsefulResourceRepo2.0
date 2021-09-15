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

#define GRPC_CORE_LIB_GPR_ALLOC_H

#include <grpc/support/port_platform.h>

/// Given a size, round up to the next multiple of sizeof(void*).
#define GPR_ROUND_UP_TO_ALIGNMENT_SIZE(x) \
  (((x) + GPR_MAX_ALIGNMENT - 1u) & ~(GPR_MAX_ALIGNMENT - 1u))

#endif /* GRPC_CORE_LIB_GPR_ALLOC_H */
