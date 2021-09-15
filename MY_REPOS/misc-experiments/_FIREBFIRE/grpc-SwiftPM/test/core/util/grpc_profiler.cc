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
filer.h"

#if GRPC_HAVE_PERFTOOLS
#include <gperftools/profiler.h>

void grpc_profiler_start(const char* filename) { ProfilerStart(filename); }

void grpc_profiler_stop() { ProfilerStop(); }
#else
#include <grpc/support/log.h>

void grpc_profiler_start(const char* filename) {
  static int printed_warning = 0;
  if (!printed_warning) {
    gpr_log(GPR_DEBUG,
            "You do not have google-perftools installed, profiling is disabled "
            "[for %s]",
            filename);
    gpr_log(GPR_DEBUG,
            "To install on ubuntu: sudo apt-get install google-perftools "
            "libgoogle-perftools-dev");
    printed_warning = 1;
  }
}

void grpc_profiler_stop(void) {}
#endif
