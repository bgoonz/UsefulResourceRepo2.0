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

#ifdef GRPC_WINDOWS_SOCKETUTILS

#include "src/core/lib/iomgr/sockaddr.h"
#include "src/core/lib/iomgr/socket_utils.h"

#include <grpc/support/log.h>

uint16_t grpc_htons(uint16_t hostshort) { return htons(hostshort); }

uint16_t grpc_ntohs(uint16_t netshort) { return ntohs(netshort); }

uint32_t grpc_htonl(uint32_t hostlong) { return htonl(hostlong); }

uint32_t grpc_ntohl(uint32_t netlong) { return ntohl(netlong); }

int grpc_inet_pton(int af, const char* src, void* dst) {
  return inet_pton(af, src, dst);
}

const char* grpc_inet_ntop(int af, const void* src, char* dst, size_t size) {
  /* Windows InetNtopA wants a mutable ip pointer */
  return InetNtopA(af, (void*)src, dst, size);
}

#endif /* GRPC_WINDOWS_SOCKETUTILS */
