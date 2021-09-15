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
EDENTIALS_IMPL_H
#define GRPCPP_SECURITY_CRONET_CREDENTIALS_IMPL_H

#include <memory>

namespace grpc_impl {

class ChannelCredentials;

/// Credentials for a channel using Cronet.
std::shared_ptr<ChannelCredentials> CronetChannelCredentials(void* engine);

}  // namespace grpc_impl

#endif  // GRPCPP_SECURITY_CRONET_CREDENTIALS_IMPL_H
