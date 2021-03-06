/*
 *
 * Copyright 2016 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *

#define GRPCPP_SERVER_POSIX_H

#include <grpcpp/server_posix_impl.h>

namespace grpc {

#ifdef GPR_SUPPORT_CHANNELS_FROM_FD

static inline void AddInsecureChannelFromFd(Server* server, int fd) {
  ::grpc_impl::AddInsecureChannelFromFd(server, fd);
}

#endif  // GPR_SUPPORT_CHANNELS_FROM_FD

}  // namespace grpc

#endif  // GRPCPP_SERVER_POSIX_H
