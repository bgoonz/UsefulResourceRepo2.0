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
ET_CUSTOM_H
#define GRPC_CORE_LIB_IOMGR_POLLSET_CUSTOM_H

#include <grpc/support/port_platform.h>

#include <stddef.h>

typedef struct grpc_custom_poller_vtable {
  void (*init)();
  void (*poll)(size_t timeout_ms);
  void (*kick)();
  void (*shutdown)();
} grpc_custom_poller_vtable;

void grpc_custom_pollset_init(grpc_custom_poller_vtable* vtable);

#endif /* GRPC_CORE_LIB_IOMGR_POLLSET_CUSTOM_H */
