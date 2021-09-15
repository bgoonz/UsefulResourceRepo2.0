/*
 *
 * Copyright 2018 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
P_CLIENT_AUTHORITY_FILTER_H
#define GRPC_CORE_EXT_FILTERS_HTTP_CLIENT_AUTHORITY_FILTER_H

#include <grpc/support/port_platform.h>

#include <grpc/impl/codegen/compression_types.h>

#include "src/core/lib/channel/channel_stack.h"

/// Filter responsible for setting the authority header, if not already set. It
/// uses the value of the GRPC_ARG_DEFAULT_AUTHORITY channel arg if the initial
/// metadata doesn't already contain an authority value.

extern const grpc_channel_filter grpc_client_authority_filter;

#endif /* GRPC_CORE_EXT_FILTERS_HTTP_CLIENT_AUTHORITY_FILTER_H */
