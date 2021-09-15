/*
 *
 * Copyright 2017 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
orm.h>

#include "src/core/ext/transport/inproc/inproc_transport.h"
#include "src/core/lib/debug/trace.h"

grpc_core::TraceFlag grpc_inproc_trace(false, "inproc");

void grpc_inproc_plugin_init(void) { grpc_inproc_transport_init(); }

void grpc_inproc_plugin_shutdown(void) { grpc_inproc_transport_shutdown(); }
