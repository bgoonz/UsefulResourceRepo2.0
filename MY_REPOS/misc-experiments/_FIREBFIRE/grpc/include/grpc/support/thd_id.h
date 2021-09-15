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

#define GRPC_SUPPORT_THD_ID_H
/** Thread ID interface for GPR.

   Used by some wrapped languages for logging purposes.

   Types
        gpr_thd_id        a unique opaque identifier for a thread.
 */

#include <grpc/support/port_platform.h>

#ifdef __cplusplus
extern "C" {
#endif

typedef uintptr_t gpr_thd_id;

/** Returns the identifier of the current thread. */
GPRAPI gpr_thd_id gpr_thd_currentid(void);

#ifdef __cplusplus
}
#endif

#endif /* GRPC_SUPPORT_THD_ID_H */
