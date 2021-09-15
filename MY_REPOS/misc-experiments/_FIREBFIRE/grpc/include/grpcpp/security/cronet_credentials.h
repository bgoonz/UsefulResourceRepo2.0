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
EDENTIALS_H
#define GRPCPP_SECURITY_CRONET_CREDENTIALS_H

#include <grpcpp/security/cronet_credentials_impl.h>

namespace grpc {

std::shared_ptr<ChannelCredentials> CronetChannelCredentials(void* engine);

}  // namespace grpc

#endif  // GRPCPP_SECURITY_CRONET_CREDENTIALS_H
