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
OOL_H
#define GRPC_TEST_CPP_UTIL_GRPC_TOOL_H

#include <functional>

#include <grpcpp/support/config.h>

#include "test/cpp/util/cli_credentials.h"

namespace grpc {
namespace testing {

typedef std::function<bool(const grpc::string&)> GrpcToolOutputCallback;

int GrpcToolMainLib(int argc, const char** argv, const CliCredentials& cred,
                    GrpcToolOutputCallback callback);

}  // namespace testing
}  // namespace grpc

#endif  // GRPC_TEST_CPP_UTIL_GRPC_TOOL_H
