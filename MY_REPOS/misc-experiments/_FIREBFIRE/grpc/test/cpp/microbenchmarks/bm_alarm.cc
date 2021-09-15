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
e that immediately-firing alarms are fast */

#include <benchmark/benchmark.h>
#include <grpc/grpc.h>
#include <grpcpp/alarm.h>
#include <grpcpp/completion_queue.h>
#include <grpcpp/impl/grpc_library.h>
#include "test/core/util/test_config.h"
#include "test/cpp/microbenchmarks/helpers.h"
#include "test/cpp/util/test_config.h"

namespace grpc {
namespace testing {

static void BM_Alarm_Tag_Immediate(benchmark::State& state) {
  TrackCounters track_counters;
  CompletionQueue cq;
  Alarm alarm;
  void* output_tag;
  bool ok;
  auto deadline = grpc_timeout_seconds_to_deadline(0);
  for (auto _ : state) {
    alarm.Set(&cq, deadline, nullptr);
    cq.Next(&output_tag, &ok);
  }
  track_counters.Finish(state);
}
BENCHMARK(BM_Alarm_Tag_Immediate);

}  // namespace testing
}  // namespace grpc

// Some distros have RunSpecifiedBenchmarks under the benchmark namespace,
// and others do not. This allows us to support both modes.
namespace benchmark {
void RunTheBenchmarksNamespaced() { RunSpecifiedBenchmarks(); }
}  // namespace benchmark

int main(int argc, char** argv) {
  grpc::testing::TestEnvironment env(argc, argv);
  LibraryInitializer libInit;
  ::benchmark::Initialize(&argc, argv);
  ::grpc::testing::InitTest(&argc, &argv, false);
  benchmark::RunTheBenchmarksNamespaced();
  return 0;
}
