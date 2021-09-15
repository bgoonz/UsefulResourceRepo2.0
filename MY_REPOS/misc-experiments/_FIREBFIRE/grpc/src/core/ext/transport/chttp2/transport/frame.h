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
HTTP2_TRANSPORT_FRAME_H
#define GRPC_CORE_EXT_TRANSPORT_CHTTP2_TRANSPORT_FRAME_H

#include <grpc/support/port_platform.h>

#include <grpc/slice.h>

#include "src/core/lib/iomgr/error.h"

/* defined in internal.h */
typedef struct grpc_chttp2_stream grpc_chttp2_stream;
typedef struct grpc_chttp2_transport grpc_chttp2_transport;

#define GRPC_CHTTP2_FRAME_DATA 0
#define GRPC_CHTTP2_FRAME_HEADER 1
#define GRPC_CHTTP2_FRAME_CONTINUATION 9
#define GRPC_CHTTP2_FRAME_RST_STREAM 3
#define GRPC_CHTTP2_FRAME_SETTINGS 4
#define GRPC_CHTTP2_FRAME_PING 6
#define GRPC_CHTTP2_FRAME_GOAWAY 7
#define GRPC_CHTTP2_FRAME_WINDOW_UPDATE 8

#define GRPC_CHTTP2_DATA_FLAG_END_STREAM 1
#define GRPC_CHTTP2_FLAG_ACK 1
#define GRPC_CHTTP2_DATA_FLAG_END_HEADERS 4
#define GRPC_CHTTP2_DATA_FLAG_PADDED 8
#define GRPC_CHTTP2_FLAG_HAS_PRIORITY 0x20

#endif /* GRPC_CORE_EXT_TRANSPORT_CHTTP2_TRANSPORT_FRAME_H */
