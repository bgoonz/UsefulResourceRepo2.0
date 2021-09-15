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


#include <grpc/grpc_posix.h>

namespace grpc {

#ifdef GPR_SUPPORT_CHANNELS_FROM_FD

void AddInsecureChannelFromFd(grpc::Server* server, int fd) {
  grpc_server_add_insecure_channel_from_fd(server->c_server(), nullptr, fd);
}

#endif  // GPR_SUPPORT_CHANNELS_FROM_FD

}  // namespace grpc
