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

#include <grpcpp/completion_queue.h>
#include <gtest/gtest.h>

#include "test/core/util/test_config.h"

namespace grpc {
namespace {

class CodegenTestFull : public ::testing::Test {};

TEST_F(CodegenTestFull, Init) {
  grpc::CompletionQueue cq;
  void* tag = nullptr;
  bool ok = false;
  cq.AsyncNext(&tag, &ok, gpr_time_0(GPR_CLOCK_REALTIME));
  ASSERT_FALSE(ok);
}

}  // namespace
}  // namespace grpc

int main(int argc, char** argv) {
  grpc::testing::TestEnvironment env(argc, argv);
  ::testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}
