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
PLETION_QUEUE_FACTORY_H
#define GRPC_CORE_LIB_SURFACE_COMPLETION_QUEUE_FACTORY_H

#include <grpc/support/port_platform.h>

#include <grpc/grpc.h>
#include "src/core/lib/surface/completion_queue.h"

typedef struct grpc_completion_queue_factory_vtable {
  grpc_completion_queue* (*create)(const grpc_completion_queue_factory*,
                                   const grpc_completion_queue_attributes*);
} grpc_completion_queue_factory_vtable;

struct grpc_completion_queue_factory {
  const char* name;
  void* data; /* Factory specific data */
  grpc_completion_queue_factory_vtable* vtable;
};

#endif /* GRPC_CORE_LIB_SURFACE_COMPLETION_QUEUE_FACTORY_H */
