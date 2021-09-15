/*
 *
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
NAL_H
#define GRPC_CORE_LIB_GPRPP_OPTIONAL_H

#include <grpc/support/port_platform.h>

#include "absl/types/optional.h"

namespace grpc_core {

template <typename T>
using Optional = absl::optional<T>;

}  // namespace grpc_core

#endif /* GRPC_CORE_LIB_GPRPP_OPTIONAL_H */
