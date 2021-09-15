/*
 *
 * Copyright 2018 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
L_TRACE_PROTO_HELPER_H
#define GRPC_TEST_CPP_UTIL_CHANNEL_TRACE_PROTO_HELPER_H

namespace grpc {
namespace testing {

void ValidateChannelTraceProtoJsonTranslation(const char* json_c_str);
void ValidateChannelProtoJsonTranslation(const char* json_c_str);
void ValidateGetTopChannelsResponseProtoJsonTranslation(const char* json_c_str);
void ValidateGetChannelResponseProtoJsonTranslation(const char* json_c_str);
void ValidateGetServerResponseProtoJsonTranslation(const char* json_c_str);
void ValidateSubchannelProtoJsonTranslation(const char* json_c_str);
void ValidateServerProtoJsonTranslation(const char* json_c_str);
void ValidateGetServersResponseProtoJsonTranslation(const char* json_c_str);

}  // namespace testing
}  // namespace grpc

#endif  // GRPC_TEST_CPP_UTIL_CHANNEL_TRACE_PROTO_HELPER_H
