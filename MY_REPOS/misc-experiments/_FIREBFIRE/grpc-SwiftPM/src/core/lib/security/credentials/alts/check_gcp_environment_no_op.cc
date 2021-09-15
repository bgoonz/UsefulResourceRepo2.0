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

#if !defined(GPR_LINUX) && !defined(GPR_WINDOWS)

#include "src/core/lib/security/credentials/alts/check_gcp_environment.h"

#include <grpc/support/log.h>

bool grpc_alts_is_running_on_gcp() {
  gpr_log(GPR_INFO,
          "ALTS: Platforms other than Linux and Windows are not supported");
  return false;
}

#endif  // !defined(LINUX) && !defined(GPR_WINDOWS)
