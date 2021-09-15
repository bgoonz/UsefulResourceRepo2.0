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
REPORTER_GET_CPU_STATS_H
#define GRPC_SRC_CPP_SERVER_LOAD_REPORTER_GET_CPU_STATS_H

#include <grpc/impl/codegen/port_platform.h>

#include <utility>

namespace grpc {
namespace load_reporter {

// Reads the CPU stats (in a pair of busy and total numbers) from the system.
// The units of the stats should be the same.
std::pair<uint64_t, uint64_t> GetCpuStatsImpl();

}  // namespace load_reporter
}  // namespace grpc

#endif  // GRPC_SRC_CPP_SERVER_LOAD_REPORTER_GET_CPU_STATS_H
