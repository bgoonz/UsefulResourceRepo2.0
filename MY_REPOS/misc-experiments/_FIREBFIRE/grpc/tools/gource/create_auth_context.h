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

#include <grpc++/security/auth_context.h>
#include <grpc/grpc.h>

namespace grpc {

std::shared_ptr<const AuthContext> CreateAuthContext(grpc_call* call);

}  // namespace grpc
