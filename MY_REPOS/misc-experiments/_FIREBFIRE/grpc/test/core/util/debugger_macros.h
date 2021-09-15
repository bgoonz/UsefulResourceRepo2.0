/*
 *
 * Copyright 2016 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
GER_MACROS_H
#define GRPC_TEST_CORE_UTIL_DEBUGGER_MACROS_H

#include "src/core/ext/transport/chttp2/transport/internal.h"
#include "src/core/lib/surface/call.h"

grpc_chttp2_stream* grpc_chttp2_stream_from_call(grpc_call* call);

#endif /* GRPC_TEST_CORE_UTIL_DEBUGGER_MACROS_H */
