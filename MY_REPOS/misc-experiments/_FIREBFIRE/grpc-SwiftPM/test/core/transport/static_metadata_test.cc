/*
 *
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *


#include <grpc/grpc.h>

#include "src/core/lib/transport/metadata.h"
#include "src/core/lib/transport/static_metadata.h"
#include "test/core/util/test_config.h"

namespace grpc_core {
namespace {

TEST(StaticMetadataTest, ReadAllStaticElements) {
  // This makes sure that all static elements are returned when
  // grpc_mdelem_from_slices is called with key pairs pregenerated.
  for (int i = 0; i < GRPC_STATIC_MDELEM_COUNT; i++) {
    const grpc_mdelem mdelem = grpc_static_mdelem_manifested()[i];
    const grpc_mdelem mdelem2 =
        grpc_mdelem_from_slices(GRPC_MDKEY(mdelem), GRPC_MDVALUE(mdelem));
    EXPECT_EQ(mdelem.payload, mdelem2.payload);
  }
}

}  // namespace
}  // namespace grpc_core

int main(int argc, char** argv) {
  ::testing::InitGoogleTest(&argc, argv);
  grpc_init();
  grpc::testing::TestEnvironment env(argc, argv);
  int retval = RUN_ALL_TESTS();
  grpc_shutdown();
  return retval;
}
