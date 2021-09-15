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

#include "src/core/lib/security/transport/tsi_error.h"

grpc_error* grpc_set_tsi_error_result(grpc_error* error, tsi_result result) {
  return grpc_error_set_int(
      grpc_error_set_str(
          error, GRPC_ERROR_STR_TSI_ERROR,
          grpc_slice_from_static_string(tsi_result_to_string(result))),
      GRPC_ERROR_INT_TSI_CODE, result);
}
