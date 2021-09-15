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
TATUS_CONVERSION_H
#define GRPC_CORE_LIB_TRANSPORT_STATUS_CONVERSION_H

#include <grpc/support/port_platform.h>

#include <grpc/grpc.h>

#include "src/core/lib/iomgr/exec_ctx.h"
#include "src/core/lib/transport/http2_errors.h"

/* Conversion of grpc status codes to http2 error codes (for RST_STREAM) */
grpc_http2_error_code grpc_status_to_http2_error(grpc_status_code status);
grpc_status_code grpc_http2_error_to_grpc_status(grpc_http2_error_code error,
                                                 grpc_millis deadline);

/* Conversion of HTTP status codes (:status) to grpc status codes */
grpc_status_code grpc_http2_status_to_grpc_status(int status);
int grpc_status_to_http2_status(grpc_status_code status);

#endif /* GRPC_CORE_LIB_TRANSPORT_STATUS_CONVERSION_H */
