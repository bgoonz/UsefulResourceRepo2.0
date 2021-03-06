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

#include <grpc/support/log.h>
#include <grpc/support/time.h>

#include "src/core/lib/surface/init.h"
#include "test/core/util/test_config.h"

static int g_flag;

static void test(int rounds) {
  int i;
  for (i = 0; i < rounds; i++) {
    grpc_init();
  }
  for (i = 0; i < rounds; i++) {
    grpc_shutdown();
  }
  grpc_maybe_wait_for_async_shutdown();
}

static void test_blocking(int rounds) {
  int i;
  for (i = 0; i < rounds; i++) {
    grpc_init();
  }
  for (i = 0; i < rounds; i++) {
    grpc_shutdown_blocking();
  }
}

static void test_mixed(void) {
  grpc_init();
  grpc_init();
  grpc_shutdown();
  grpc_init();
  grpc_shutdown();
  grpc_shutdown();
  grpc_maybe_wait_for_async_shutdown();
}

static void plugin_init(void) { g_flag = 1; }
static void plugin_destroy(void) { g_flag = 2; }

static void test_plugin() {
  grpc_register_plugin(plugin_init, plugin_destroy);
  grpc_init();
  GPR_ASSERT(g_flag == 1);
  grpc_shutdown_blocking();
  GPR_ASSERT(g_flag == 2);
}

static void test_repeatedly() {
  for (int i = 0; i < 1000; i++) {
    grpc_init();
    grpc_shutdown();
  }
  grpc_maybe_wait_for_async_shutdown();
}

static void test_repeatedly_blocking() {
  for (int i = 0; i < 1000; i++) {
    grpc_init();
    grpc_shutdown_blocking();
  }
}

int main(int argc, char** argv) {
  grpc::testing::TestEnvironment env(argc, argv);
  test(1);
  test(2);
  test(3);
  test_blocking(1);
  test_blocking(2);
  test_blocking(3);
  test_mixed();
  test_plugin();
  test_repeatedly();
  test_repeatedly_blocking();
  return 0;
}
