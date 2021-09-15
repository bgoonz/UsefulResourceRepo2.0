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

#define TEST_QPS_PARSE_JSON_H

#include <grpcpp/impl/codegen/config_protobuf.h>
#include <grpcpp/support/config.h>

namespace grpc {
namespace testing {

void ParseJson(const grpc::string& json, const grpc::string& type,
               GRPC_CUSTOM_MESSAGE* msg);

grpc::string SerializeJson(const GRPC_CUSTOM_MESSAGE& msg,
                           const grpc::string& type);

}  // namespace testing
}  // namespace grpc

#endif  // TEST_QPS_PARSE_JSON_H
