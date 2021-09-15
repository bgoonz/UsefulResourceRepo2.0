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
m:
   templates/src/core/surface/version.c.template */

#include <grpcpp/grpcpp.h>

namespace grpc {
grpc::string Version() { return "1.28.2"; }
}  // namespace grpc
