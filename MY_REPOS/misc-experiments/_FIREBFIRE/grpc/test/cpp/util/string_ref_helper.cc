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
f_helper.h"

namespace grpc {
namespace testing {

std::string ToString(const grpc::string_ref& r) {
  return std::string(r.data(), r.size());
}

}  // namespace testing
}  // namespace grpc
