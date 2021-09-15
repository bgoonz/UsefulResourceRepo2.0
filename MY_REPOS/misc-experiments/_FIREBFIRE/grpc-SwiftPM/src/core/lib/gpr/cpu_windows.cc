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
orm.h>

#ifdef GPR_WINDOWS
#include <grpc/support/cpu.h>
#include <grpc/support/log.h>

unsigned gpr_cpu_num_cores(void) {
  SYSTEM_INFO si;
  GetSystemInfo(&si);
  return si.dwNumberOfProcessors;
}

unsigned gpr_cpu_current_cpu(void) { return GetCurrentProcessorNumber(); }

#endif /* GPR_WINDOWS */
