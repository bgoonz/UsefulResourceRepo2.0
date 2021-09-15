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
OLLEX_LINUX_H
#define GRPC_CORE_LIB_IOMGR_EV_EPOLLEX_LINUX_H

#include <grpc/support/port_platform.h>

#include "src/core/lib/iomgr/ev_posix.h"
#include "src/core/lib/iomgr/port.h"

const grpc_event_engine_vtable* grpc_init_epollex_linux(
    bool explicitly_requested);

#endif /* GRPC_CORE_LIB_IOMGR_EV_EPOLLEX_LINUX_H */
