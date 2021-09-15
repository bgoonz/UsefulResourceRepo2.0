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
UFFER_PROTO_HELPER_H
#define GRPC_TEST_CPP_UTIL_BYTE_BUFFER_PROTO_HELPER_H

#include <memory>

#include <grpcpp/impl/codegen/config_protobuf.h>
#include <grpcpp/support/byte_buffer.h>

namespace grpc {
namespace testing {

bool ParseFromByteBuffer(ByteBuffer* buffer,
                         ::grpc::protobuf::Message* message);

std::unique_ptr<ByteBuffer> SerializeToByteBuffer(
    ::grpc::protobuf::Message* message);

bool SerializeToByteBufferInPlace(::grpc::protobuf::Message* message,
                                  ByteBuffer* buffer);

}  // namespace testing
}  // namespace grpc

#endif  // GRPC_TEST_CPP_UTIL_BYTE_BUFFER_PROTO_HELPER_H
