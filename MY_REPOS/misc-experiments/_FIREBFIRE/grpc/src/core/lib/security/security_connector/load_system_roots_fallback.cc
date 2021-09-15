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
orm.h>

#include <grpc/slice_buffer.h>
#include "src/core/lib/security/security_connector/load_system_roots.h"

#if !defined(GPR_LINUX) && !defined(GPR_ANDROID)

namespace grpc_core {

grpc_slice LoadSystemRootCerts() { return grpc_empty_slice(); }

}  // namespace grpc_core

#endif /* !(GPR_LINUX || GPR_ANDROID) */
