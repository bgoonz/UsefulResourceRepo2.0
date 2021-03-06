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
.h"

// This test won't work except with posix sockets enabled
#ifdef GRPC_POSIX_SOCKET_UTILS_COMMON

#include "src/core/lib/iomgr/socket_utils_posix.h"

#include <errno.h>
#include <netinet/in.h>
#include <netinet/ip.h>
#include <string.h>

#include <grpc/support/alloc.h>
#include <grpc/support/log.h>
#include <grpc/support/sync.h>

#include "src/core/lib/gpr/useful.h"
#include "src/core/lib/iomgr/socket_mutator.h"
#include "test/core/util/test_config.h"

struct test_socket_mutator {
  grpc_socket_mutator base;
  int option_value;
};

static bool mutate_fd(int fd, grpc_socket_mutator* mutator) {
  int newval;
  socklen_t intlen = sizeof(newval);
  struct test_socket_mutator* m =
      reinterpret_cast<struct test_socket_mutator*>(mutator);

  if (0 != setsockopt(fd, IPPROTO_IP, IP_TOS, &m->option_value,
                      sizeof(m->option_value))) {
    return false;
  }
  if (0 != getsockopt(fd, IPPROTO_IP, IP_TOS, &newval, &intlen)) {
    return false;
  }
  if (newval != m->option_value) {
    return false;
  }
  return true;
}

static void destroy_test_mutator(grpc_socket_mutator* mutator) {
  struct test_socket_mutator* m =
      reinterpret_cast<struct test_socket_mutator*>(mutator);
  gpr_free(m);
}

static int compare_test_mutator(grpc_socket_mutator* a,
                                grpc_socket_mutator* b) {
  struct test_socket_mutator* ma =
      reinterpret_cast<struct test_socket_mutator*>(a);
  struct test_socket_mutator* mb =
      reinterpret_cast<struct test_socket_mutator*>(b);
  return GPR_ICMP(ma->option_value, mb->option_value);
}

static const grpc_socket_mutator_vtable mutator_vtable = {
    mutate_fd, compare_test_mutator, destroy_test_mutator};

int main(int argc, char** argv) {
  int sock;
  grpc_error* err;
  grpc::testing::TestEnvironment env(argc, argv);

  sock = socket(PF_INET, SOCK_STREAM, 0);
  GPR_ASSERT(sock > 0);

  GPR_ASSERT(GRPC_LOG_IF_ERROR("set_socket_nonblocking",
                               grpc_set_socket_nonblocking(sock, 1)));
  GPR_ASSERT(GRPC_LOG_IF_ERROR("set_socket_nonblocking",
                               grpc_set_socket_nonblocking(sock, 0)));
  GPR_ASSERT(GRPC_LOG_IF_ERROR("set_socket_cloexec",
                               grpc_set_socket_cloexec(sock, 1)));
  GPR_ASSERT(GRPC_LOG_IF_ERROR("set_socket_cloexec",
                               grpc_set_socket_cloexec(sock, 0)));
  GPR_ASSERT(GRPC_LOG_IF_ERROR("set_socket_reuse_addr",
                               grpc_set_socket_reuse_addr(sock, 1)));
  GPR_ASSERT(GRPC_LOG_IF_ERROR("set_socket_reuse_addr",
                               grpc_set_socket_reuse_addr(sock, 0)));
  GPR_ASSERT(GRPC_LOG_IF_ERROR("set_socket_low_latency",
                               grpc_set_socket_low_latency(sock, 1)));
  GPR_ASSERT(GRPC_LOG_IF_ERROR("set_socket_low_latency",
                               grpc_set_socket_low_latency(sock, 0)));

  struct test_socket_mutator mutator;
  grpc_socket_mutator_init(&mutator.base, &mutator_vtable);

  mutator.option_value = IPTOS_LOWDELAY;
  GPR_ASSERT(GRPC_LOG_IF_ERROR(
      "set_socket_with_mutator",
      grpc_set_socket_with_mutator(sock, (grpc_socket_mutator*)&mutator)));

  mutator.option_value = IPTOS_THROUGHPUT;
  GPR_ASSERT(GRPC_LOG_IF_ERROR(
      "set_socket_with_mutator",
      grpc_set_socket_with_mutator(sock, (grpc_socket_mutator*)&mutator)));

  mutator.option_value = IPTOS_RELIABILITY;
  GPR_ASSERT(GRPC_LOG_IF_ERROR(
      "set_socket_with_mutator",
      grpc_set_socket_with_mutator(sock, (grpc_socket_mutator*)&mutator)));

  mutator.option_value = -1;
  err = grpc_set_socket_with_mutator(
      sock, reinterpret_cast<grpc_socket_mutator*>(&mutator));
  GPR_ASSERT(err != GRPC_ERROR_NONE);
  GRPC_ERROR_UNREF(err);

  close(sock);

  return 0;
}

#else /* GRPC_POSIX_SOCKET_UTILS_COMMON */

int main(int argc, char** argv) { return 1; }

#endif /* GRPC_POSIX_SOCKET_UTILS_COMMON */
