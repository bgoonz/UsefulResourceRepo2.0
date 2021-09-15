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
NECTED_CHANNEL_H
#define GRPC_CORE_LIB_CHANNEL_CONNECTED_CHANNEL_H

#include <grpc/support/port_platform.h>

#include "src/core/lib/channel/channel_stack_builder.h"

extern const grpc_channel_filter grpc_connected_filter;

bool grpc_add_connected_filter(grpc_channel_stack_builder* builder,
                               void* arg_must_be_null);

/* Debug helper to dig the transport stream out of a call element */
grpc_stream* grpc_connected_channel_get_stream(grpc_call_element* elem);

#endif /* GRPC_CORE_LIB_CHANNEL_CONNECTED_CHANNEL_H */
