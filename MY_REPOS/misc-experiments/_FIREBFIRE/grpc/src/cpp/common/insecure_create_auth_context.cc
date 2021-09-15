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

#include <grpc/grpc.h>
#include <grpcpp/security/auth_context.h>

namespace grpc {

std::shared_ptr<const AuthContext> CreateAuthContext(grpc_call* call) {
  (void)call;
  return std::shared_ptr<const AuthContext>();
}

}  // namespace grpc
