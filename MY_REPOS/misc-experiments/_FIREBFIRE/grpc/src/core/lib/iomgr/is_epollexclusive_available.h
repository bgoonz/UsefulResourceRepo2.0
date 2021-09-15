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
OLLEXCLUSIVE_AVAILABLE_H
#define GRPC_CORE_LIB_IOMGR_IS_EPOLLEXCLUSIVE_AVAILABLE_H

#include <grpc/support/port_platform.h>

#include <stdbool.h>

#ifdef __cplusplus
extern "C" {
#endif

bool grpc_is_epollexclusive_available(void);

#ifdef __cplusplus
}
#endif

#endif /* GRPC_CORE_LIB_IOMGR_IS_EPOLLEXCLUSIVE_AVAILABLE_H */
