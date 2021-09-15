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
GUMENTS_H
#define GRPCPP_SUPPORT_CHANNEL_ARGUMENTS_H

#include <grpcpp/support/channel_arguments_impl.h>

namespace grpc_impl {

class SecureChannelCredentials;
class ResourceQuota;
}  // namespace grpc_impl

namespace grpc {

typedef ::grpc_impl::ChannelArguments ChannelArguments;

}  // namespace grpc

#endif  // GRPCPP_SUPPORT_CHANNEL_ARGUMENTS_H
