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
orm.h>

#include "src/core/lib/iomgr/port.h"

#if GRPC_IF_NAMETOINDEX == 0 || !defined(GRPC_POSIX_SOCKET_IF_NAMETOINDEX)

#include "src/core/lib/iomgr/grpc_if_nametoindex.h"

#include <grpc/support/log.h>

uint32_t grpc_if_nametoindex(char* name) {
  gpr_log(GPR_DEBUG,
          "Not attempting to convert interface name %s to index for current "
          "platform.",
          name);
  return 0;
}

#endif /* GRPC_IF_NAMETOINDEX == 0 || \
          !defined(GRPC_POSIX_SOCKET_IF_NAMETOINDEX) */
