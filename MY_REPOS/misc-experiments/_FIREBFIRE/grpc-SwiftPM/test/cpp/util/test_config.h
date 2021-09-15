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
ONFIG_H
#define GRPC_TEST_CPP_UTIL_TEST_CONFIG_H

namespace grpc {
namespace testing {

void InitTest(int* argc, char*** argv, bool remove_flags);

}  // namespace testing
}  // namespace grpc

#endif  // GRPC_TEST_CPP_UTIL_TEST_CONFIG_H
