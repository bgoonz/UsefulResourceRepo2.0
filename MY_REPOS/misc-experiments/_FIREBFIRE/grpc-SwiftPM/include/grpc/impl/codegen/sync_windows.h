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
NDOWS_H
#define GRPC_IMPL_CODEGEN_SYNC_WINDOWS_H

#include <grpc/impl/codegen/port_platform.h>

#include <grpc/impl/codegen/sync_generic.h>

typedef struct {
  CRITICAL_SECTION cs; /* Not an SRWLock until Vista is unsupported */
  int locked;
} gpr_mu;

typedef CONDITION_VARIABLE gpr_cv;

typedef INIT_ONCE gpr_once;
#define GPR_ONCE_INIT INIT_ONCE_STATIC_INIT

#endif /* GRPC_IMPL_CODEGEN_SYNC_WINDOWS_H */
