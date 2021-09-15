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
tor.h>
#include <google/protobuf/descriptor.pb.h>

bool protobuf_test(const google::protobuf::MethodDescriptor *method) {
  return method->client_streaming() || method->server_streaming();
}

int main() { return 0; }
