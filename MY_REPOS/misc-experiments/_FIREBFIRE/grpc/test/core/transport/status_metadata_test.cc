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
status_metadata.h"
#include "src/core/lib/transport/static_metadata.h"
#include "test/core/util/test_config.h"

#include <gtest/gtest.h>

namespace {

TEST(GetStatusCodeFromMetadata, OK) {
  EXPECT_EQ(GRPC_STATUS_OK,
            grpc_get_status_code_from_metadata(GRPC_MDELEM_GRPC_STATUS_0));
}

TEST(GetStatusCodeFromMetadata, CANCELLED) {
  EXPECT_EQ(GRPC_STATUS_CANCELLED,
            grpc_get_status_code_from_metadata(GRPC_MDELEM_GRPC_STATUS_1));
}

TEST(GetStatusCodeFromMetadata, UNKNOWN) {
  EXPECT_EQ(GRPC_STATUS_UNKNOWN,
            grpc_get_status_code_from_metadata(GRPC_MDELEM_GRPC_STATUS_2));
}

TEST(GetStatusCodeFromMetadata, Other) {
  grpc_mdelem status_md = grpc_mdelem_from_slices(
      GRPC_MDSTR_GRPC_STATUS, grpc_slice_from_static_string("10"));
  EXPECT_EQ(GRPC_STATUS_ABORTED, grpc_get_status_code_from_metadata(status_md));
  GRPC_MDELEM_UNREF(status_md);
}

TEST(GetStatusCodeFromMetadata, Unparseable) {
  grpc_mdelem status_md = grpc_mdelem_from_slices(
      GRPC_MDSTR_GRPC_STATUS, grpc_slice_from_static_string("NaN"));
  EXPECT_EQ(GRPC_STATUS_UNKNOWN, grpc_get_status_code_from_metadata(status_md));
  GRPC_MDELEM_UNREF(status_md);
}

}  // namespace

int main(int argc, char** argv) {
  grpc::testing::TestEnvironment env(argc, argv);
  ::testing::InitGoogleTest(&argc, argv);
  grpc_init();
  int ret = RUN_ALL_TESTS();
  grpc_shutdown();
  return ret;
}
