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
orm.h>

#include "src/core/lib/iomgr/port.h"

#ifdef GRPC_POSIX_SOCKETUTILS

#include "src/core/lib/iomgr/socket_utils_posix.h"

#include <fcntl.h>
#include <sys/socket.h>
#include <unistd.h>

#include <grpc/support/log.h>
#include "src/core/lib/iomgr/sockaddr.h"

int grpc_accept4(int sockfd, grpc_resolved_address* resolved_addr, int nonblock,
                 int cloexec) {
  int fd, flags;
  fd = accept(sockfd, reinterpret_cast<grpc_sockaddr*>(resolved_addr->addr),
              &resolved_addr->len);
  if (fd >= 0) {
    if (nonblock) {
      flags = fcntl(fd, F_GETFL, 0);
      if (flags < 0) goto close_and_error;
      if (fcntl(fd, F_SETFL, flags | O_NONBLOCK) != 0) goto close_and_error;
    }
    if (cloexec) {
      flags = fcntl(fd, F_GETFD, 0);
      if (flags < 0) goto close_and_error;
      if (fcntl(fd, F_SETFD, flags | FD_CLOEXEC) != 0) goto close_and_error;
    }
  }
  return fd;

close_and_error:
  close(fd);
  return -1;
}

#endif /* GRPC_POSIX_SOCKETUTILS */
