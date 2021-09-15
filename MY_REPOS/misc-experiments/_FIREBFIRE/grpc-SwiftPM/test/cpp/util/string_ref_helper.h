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
_REF_HELPER_H
#define GRPC_TEST_CPP_UTIL_STRING_REF_HELPER_H

#include <grpcpp/support/string_ref.h>

namespace grpc {
namespace testing {

grpc::string ToString(const grpc::string_ref& r);

}  // namespace testing
}  // namespace grpc

#endif  // GRPC_TEST_CPP_UTIL_STRING_REF_HELPER_H
