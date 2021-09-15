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
ET_UV_H
#define GRPC_CORE_LIB_IOMGR_POLLSET_UV_H

extern int grpc_pollset_work_run_loop;

typedef struct grpc_custom_poller_vtable {
  void (*init)(void);
  void (*run_loop)(int blocking);
} grpc_custom_poller_vtable;

void grpc_custom_pollset_global_init(grpc_custom_poller_vtable* vtable);
void grpc_custom_pollset_global_shutdown(void);

#endif /* GRPC_CORE_LIB_IOMGR_POLLSET_UV_H */
