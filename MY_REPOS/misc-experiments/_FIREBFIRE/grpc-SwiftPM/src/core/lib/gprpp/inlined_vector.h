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
ED_VECTOR_H
#define GRPC_CORE_LIB_GPRPP_INLINED_VECTOR_H

#include <grpc/support/port_platform.h>

#include <cassert>
#include <cstring>

#include "absl/container/inlined_vector.h"
#include "src/core/lib/gprpp/memory.h"

namespace grpc_core {

template <typename T, size_t N, typename A = std::allocator<T>>
using InlinedVector = absl::InlinedVector<T, N, A>;

}  // namespace grpc_core

#endif /* GRPC_CORE_LIB_GPRPP_INLINED_VECTOR_H */
