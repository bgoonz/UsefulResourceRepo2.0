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
e that the benchmark integration is
 * working */

#include <benchmark/benchmark.h>

static void BM_NoOp(benchmark::State& state) {
  for (auto _ : state) {
  }
}
BENCHMARK(BM_NoOp);

BENCHMARK_MAIN();
