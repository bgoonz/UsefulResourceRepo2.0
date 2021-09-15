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
ANSPORT_AUTH_FILTERS_H
#define GRPC_CORE_LIB_SECURITY_TRANSPORT_AUTH_FILTERS_H

#include <grpc/support/port_platform.h>

#include <grpc/grpc_security.h>
#include "src/core/lib/channel/channel_stack.h"

extern const grpc_channel_filter grpc_client_auth_filter;
extern const grpc_channel_filter grpc_server_auth_filter;

void grpc_auth_metadata_context_build(
    const char* url_scheme, const grpc_slice& call_host,
    const grpc_slice& call_method, grpc_auth_context* auth_context,
    grpc_auth_metadata_context* auth_md_context);

#endif /* GRPC_CORE_LIB_SECURITY_TRANSPORT_AUTH_FILTERS_H */
