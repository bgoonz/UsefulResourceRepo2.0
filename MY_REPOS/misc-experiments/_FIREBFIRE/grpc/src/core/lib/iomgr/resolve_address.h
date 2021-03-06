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
VE_ADDRESS_H
#define GRPC_CORE_LIB_IOMGR_RESOLVE_ADDRESS_H

#include <grpc/support/port_platform.h>

#include <stddef.h>

#include "src/core/lib/iomgr/port.h"

#ifdef GRPC_UV
#include <uv.h>
#endif

#ifdef GRPC_WINSOCK_SOCKET
#include <ws2tcpip.h>
#endif

#if defined(GRPC_POSIX_SOCKET) || defined(GRPC_CFSTREAM)
#include <sys/socket.h>
#endif

#include "src/core/lib/iomgr/pollset_set.h"

#define GRPC_MAX_SOCKADDR_SIZE 128

struct grpc_resolved_address {
  char addr[GRPC_MAX_SOCKADDR_SIZE];
  socklen_t len;
};
struct grpc_resolved_addresses {
  size_t naddrs;
  grpc_resolved_address* addrs;
};
typedef struct grpc_address_resolver_vtable {
  void (*resolve_address)(const char* addr, const char* default_port,
                          grpc_pollset_set* interested_parties,
                          grpc_closure* on_done,
                          grpc_resolved_addresses** addresses);
  grpc_error* (*blocking_resolve_address)(const char* name,
                                          const char* default_port,
                                          grpc_resolved_addresses** addresses);
} grpc_address_resolver_vtable;

void grpc_set_resolver_impl(grpc_address_resolver_vtable* vtable);

/* Asynchronously resolve addr. Use default_port if a port isn't designated
   in addr, otherwise use the port in addr. */
/* TODO(apolcyn): add a timeout here */
void grpc_resolve_address(const char* addr, const char* default_port,
                          grpc_pollset_set* interested_parties,
                          grpc_closure* on_done,
                          grpc_resolved_addresses** addresses);

/* Destroy resolved addresses */
void grpc_resolved_addresses_destroy(grpc_resolved_addresses* addresses);

/* Resolve addr in a blocking fashion. On success,
   result must be freed with grpc_resolved_addresses_destroy. */
grpc_error* grpc_blocking_resolve_address(const char* name,
                                          const char* default_port,
                                          grpc_resolved_addresses** addresses);

#endif /* GRPC_CORE_LIB_IOMGR_RESOLVE_ADDRESS_H */
