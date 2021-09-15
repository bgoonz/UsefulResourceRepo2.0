/*
 *
 * Copyright 2020 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
SEIL_H
#define GRPC_IMPL_CODEGEN_SYNC_ABSEIL_H

#include <grpc/impl/codegen/port_platform.h>

#include <grpc/impl/codegen/sync_generic.h>

#ifdef GPR_ABSEIL_SYNC

typedef intptr_t gpr_mu;
typedef intptr_t gpr_cv;
typedef int32_t gpr_once;

#define GPR_ONCE_INIT 0

#endif

#endif /* GRPC_IMPL_CODEGEN_SYNC_ABSEIL_H */
