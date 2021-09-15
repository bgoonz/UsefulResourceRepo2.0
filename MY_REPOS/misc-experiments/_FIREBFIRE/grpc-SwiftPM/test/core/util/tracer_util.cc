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
fig.h"

#include "src/core/lib/debug/trace.h"

namespace grpc_core {
namespace testing {

void grpc_tracer_enable_flag(grpc_core::TraceFlag* flag) {
  flag->set_enabled(1);
}

}  // namespace testing
}  // namespace grpc_core
