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
IMEOUT_ENCODING_H
#define GRPC_CORE_LIB_TRANSPORT_TIMEOUT_ENCODING_H

#include <grpc/support/port_platform.h>

#include <grpc/slice.h>
#include <grpc/support/time.h>

#include "src/core/lib/gpr/string.h"
#include "src/core/lib/iomgr/exec_ctx.h"

#define GRPC_HTTP2_TIMEOUT_ENCODE_MIN_BUFSIZE 10

/* Encode/decode timeouts to the GRPC over HTTP/2 format;
   encoding may round up arbitrarily. If the timeout is larger than about 1157
   days, it will be capped and "99999999S" will be sent on the wire. */
void grpc_http2_encode_timeout(grpc_millis timeout, char* buffer);
int grpc_http2_decode_timeout(const grpc_slice& text, grpc_millis* timeout);

#endif /* GRPC_CORE_LIB_TRANSPORT_TIMEOUT_ENCODING_H */
