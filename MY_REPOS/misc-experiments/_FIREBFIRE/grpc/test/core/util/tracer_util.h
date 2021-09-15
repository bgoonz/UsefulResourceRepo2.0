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
R_UTIL_H
#define GRPC_TEST_CORE_UTIL_TRACER_UTIL_H

namespace grpc_core {
class TraceFlag;

namespace testing {
// enables the TraceFlag passed to it. Used for testing purposes.
void grpc_tracer_enable_flag(grpc_core::TraceFlag* flag);

}  // namespace testing
}  // namespace grpc_core

#endif /* GRPC_TEST_CORE_UTIL_TRACER_UTIL_H */
