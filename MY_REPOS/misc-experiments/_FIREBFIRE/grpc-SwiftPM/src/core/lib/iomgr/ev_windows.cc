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
orm.h>

#include "src/core/lib/iomgr/port.h"

#ifdef GRPC_WINSOCK_SOCKET

#include "src/core/lib/debug/trace.h"

grpc_core::DebugOnlyTraceFlag grpc_polling_trace(
    false, "polling"); /* Disabled by default */

#endif  // GRPC_WINSOCK_SOCKET
