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
orm.h>

#include "src/core/lib/iomgr/port.h"

#ifndef GRPC_POSIX_FORK

#include <grpc/fork.h>
#include <grpc/support/log.h>

/*
 * NOTE: FORKING IS NOT GENERALLY SUPPORTED, THIS IS ONLY INTENDED TO WORK
 *       AROUND VERY SPECIFIC USE CASES.
 */

void grpc_prefork() { gpr_log(GPR_ERROR, "Forking not supported on Windows"); }

void grpc_postfork_parent() {}

void grpc_postfork_child() {}

void grpc_fork_handlers_auto_register() {}

#endif  // GRPC_POSIX_FORK
