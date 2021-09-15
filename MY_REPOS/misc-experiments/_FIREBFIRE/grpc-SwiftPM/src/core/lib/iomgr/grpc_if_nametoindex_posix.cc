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

#if GRPC_IF_NAMETOINDEX == 1 && defined(GRPC_POSIX_SOCKET_IF_NAMETOINDEX)

#include "src/core/lib/iomgr/grpc_if_nametoindex.h"

#include <errno.h>
#include <net/if.h>

#include <grpc/support/log.h>

uint32_t grpc_if_nametoindex(char* name) {
  uint32_t out = if_nametoindex(name);
  if (out == 0) {
    gpr_log(GPR_DEBUG, "if_nametoindex failed for name %s. errno %d", name,
            errno);
  }
  return out;
}

#endif /* GRPC_IF_NAMETOINDEX == 1 && \
          defined(GRPC_POSIX_SOCKET_IF_NAMETOINDEX) */
