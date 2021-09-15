/*
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
P_CLIENT_HTTP_CLIENT_FILTER_H
#define GRPC_CORE_EXT_FILTERS_HTTP_CLIENT_HTTP_CLIENT_FILTER_H

#include <grpc/support/port_platform.h>

#include "src/core/lib/channel/channel_stack.h"

/* Processes metadata on the client side for HTTP2 transports */
extern const grpc_channel_filter grpc_http_client_filter;

/* Channel arg to determine maximum size of payload eligible for GET request */
#define GRPC_ARG_MAX_PAYLOAD_SIZE_FOR_GET "grpc.max_payload_size_for_get"

#endif /* GRPC_CORE_EXT_FILTERS_HTTP_CLIENT_HTTP_CLIENT_FILTER_H */
