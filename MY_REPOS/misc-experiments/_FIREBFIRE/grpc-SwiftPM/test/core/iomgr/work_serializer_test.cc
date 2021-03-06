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


#include <gtest/gtest.h>

#include <grpc/grpc.h>
#include <grpc/support/alloc.h>
#include <grpc/support/log.h>

#include "src/core/lib/gpr/useful.h"
#include "src/core/lib/gprpp/thd.h"
#include "src/core/lib/iomgr/work_serializer.h"
#include "test/core/util/test_config.h"

namespace {
TEST(WorkSerializerTest, NoOp) { grpc_core::WorkSerializer lock; }

TEST(WorkSerializerTest, ExecuteOne) {
  grpc_core::WorkSerializer lock;
  gpr_event done;
  gpr_event_init(&done);
  lock.Run([&done]() { gpr_event_set(&done, (void*)1); }, DEBUG_LOCATION);
  EXPECT_TRUE(gpr_event_wait(&done, grpc_timeout_seconds_to_deadline(5)) !=
              nullptr);
}

class TestThread {
 public:
  explicit TestThread(grpc_core::WorkSerializer* lock)
      : lock_(lock), thread_("grpc_execute_many", ExecuteManyLoop, this) {
    gpr_event_init(&done_);
    thread_.Start();
  }

  ~TestThread() {
    EXPECT_NE(gpr_event_wait(&done_, gpr_inf_future(GPR_CLOCK_REALTIME)),
              nullptr);
    thread_.Join();
  }

 private:
  static void ExecuteManyLoop(void* arg) {
    TestThread* self = static_cast<TestThread*>(arg);
    size_t n = 1;
    for (size_t i = 0; i < 10; i++) {
      for (size_t j = 0; j < 10000; j++) {
        struct ExecutionArgs {
          size_t* counter;
          size_t value;
        };
        ExecutionArgs* c = new ExecutionArgs;
        c->counter = &self->counter_;
        c->value = n++;
        self->lock_->Run(
            [c]() {
              EXPECT_TRUE(*c->counter == c->value - 1);
              *c->counter = c->value;
              delete c;
            },
            DEBUG_LOCATION);
      }
      // sleep for a little bit, to test other threads picking up the load
      gpr_sleep_until(grpc_timeout_milliseconds_to_deadline(100));
    }
    self->lock_->Run([self]() { gpr_event_set(&self->done_, (void*)1); },
                     DEBUG_LOCATION);
  }

  grpc_core::WorkSerializer* lock_ = nullptr;
  grpc_core::Thread thread_;
  size_t counter_ = 0;
  gpr_event done_;
};

TEST(WorkSerializerTest, ExecuteMany) {
  grpc_core::WorkSerializer lock;
  {
    std::vector<std::unique_ptr<TestThread>> threads;
    for (size_t i = 0; i < 100; ++i) {
      threads.push_back(std::unique_ptr<TestThread>(new TestThread(&lock)));
    }
  }
}
}  // namespace

int main(int argc, char** argv) {
  grpc::testing::TestEnvironment env(argc, argv);
  grpc_init();
  ::testing::InitGoogleTest(&argc, argv);
  int retval = RUN_ALL_TESTS();
  grpc_shutdown();
  return retval;
}
