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
STOM_H
#define GRPC_IMPL_CODEGEN_SYNC_CUSTOM_H

#include <grpc/impl/codegen/port_platform.h>

#include <grpc/impl/codegen/sync_generic.h>

/* Users defining GPR_CUSTOM_SYNC need to define the following macros. */

#ifdef GPR_CUSTOM_SYNC

typedef GPR_CUSTOM_MU_TYPE gpr_mu;
typedef GPR_CUSTOM_CV_TYPE gpr_cv;
typedef GPR_CUSTOM_ONCE_TYPE gpr_once;

#define GPR_ONCE_INIT GPR_CUSTOM_ONCE_INIT

#endif

#endif /* GRPC_IMPL_CODEGEN_SYNC_CUSTOM_H */
