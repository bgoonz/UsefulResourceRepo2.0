
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
er/eventmanager_libuv.h"

#include <grpc/grpc.h>
#include <grpc/support/time.h>
#include <gtest/gtest.h>

#include "test/core/util/test_config.h"

using grpc::experimental::LibuvEventManager;

namespace grpc_core {
namespace {

TEST(LibuvEventManager, Allocation) {
  for (int i = 0; i < 10; i++) {
    LibuvEventManager* em = new LibuvEventManager(i);
    gpr_sleep_until(grpc_timeout_milliseconds_to_deadline(1));
    delete em;
  }
}

TEST(LibuvEventManager, ShutdownRef) {
  for (int i = 0; i < 10; i++) {
    LibuvEventManager* em = new LibuvEventManager(i);
    for (int j = 0; j < i; j++) {
      em->ShutdownRef();
    }
    gpr_sleep_until(grpc_timeout_milliseconds_to_deadline(1));
    for (int j = 0; j < i; j++) {
      em->ShutdownUnref();
    }
    delete em;
  }
}

TEST(LibuvEventManager, ShutdownRefAsync) {
  for (int i = 0; i < 10; i++) {
    LibuvEventManager* em = new LibuvEventManager(i);
    for (int j = 0; j < i; j++) {
      em->ShutdownRef();
    }
    grpc_core::Thread deleter(
        "deleter", [](void* em) { delete static_cast<LibuvEventManager*>(em); },
        em);
    deleter.Start();
    gpr_sleep_until(grpc_timeout_milliseconds_to_deadline(1));
    for (int j = 0; j < i; j++) {
      em->ShutdownUnref();
    }
    deleter.Join();
  }
}

}  // namespace
}  // namespace grpc_core

int main(int argc, char** argv) {
  grpc_init();
  grpc::testing::TestEnvironment env(argc, argv);
  ::testing::InitGoogleTest(&argc, argv);
  int retval = RUN_ALL_TESTS();
  grpc_shutdown();
  return retval;
}
