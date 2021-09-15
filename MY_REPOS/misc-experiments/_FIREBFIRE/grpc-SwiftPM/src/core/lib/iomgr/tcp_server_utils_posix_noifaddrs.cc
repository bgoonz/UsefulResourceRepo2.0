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
orm.h>

#include "src/core/lib/iomgr/port.h"

#if defined(GRPC_POSIX_SOCKET) && !defined(GRPC_HAVE_IFADDRS)

#include "src/core/lib/iomgr/tcp_server_utils_posix.h"

grpc_error* grpc_tcp_server_add_all_local_addrs(grpc_tcp_server* s,
                                                unsigned port_index,
                                                int requested_port,
                                                int* out_port) {
  return GRPC_ERROR_CREATE_FROM_STATIC_STRING("no ifaddrs available");
}

bool grpc_tcp_server_have_ifaddrs(void) { return false; }

#endif /* defined(GRPC_POSIX_SOCKET) && !defined(GRPC_HAVE_IFADDRS) */
