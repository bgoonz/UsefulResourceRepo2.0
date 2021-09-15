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

#include <grpc/grpc.h>
#include <grpc/support/alloc.h>

#include <string.h>

#include "src/core/lib/surface/api_trace.h"

void grpc_metadata_array_init(grpc_metadata_array* array) {
  GRPC_API_TRACE("grpc_metadata_array_init(array=%p)", 1, (array));
  memset(array, 0, sizeof(*array));
}

void grpc_metadata_array_destroy(grpc_metadata_array* array) {
  GRPC_API_TRACE("grpc_metadata_array_destroy(array=%p)", 1, (array));
  gpr_free(array->metadata);
}
