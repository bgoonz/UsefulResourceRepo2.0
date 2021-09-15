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

#include "src/core/ext/transport/chttp2/transport/chttp2_transport.h"
#include "src/core/lib/debug/trace.h"
#include "src/core/lib/gprpp/global_config.h"
#include "src/core/lib/transport/metadata.h"

GPR_GLOBAL_CONFIG_DEFINE_BOOL(
    grpc_experimental_disable_flow_control, false,
    "If set, flow control will be effectively disabled. Max out all values and "
    "assume the remote peer does the same. Thus we can ignore any flow control "
    "bookkeeping, error checking, and decision making");

void grpc_chttp2_plugin_init(void) {
  g_flow_control_enabled =
      !GPR_GLOBAL_CONFIG_GET(grpc_experimental_disable_flow_control);
}

void grpc_chttp2_plugin_shutdown(void) {}
