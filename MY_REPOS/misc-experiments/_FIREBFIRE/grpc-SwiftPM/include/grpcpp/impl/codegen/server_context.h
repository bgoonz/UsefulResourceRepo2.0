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
R_CONTEXT_H
#define GRPCPP_IMPL_CODEGEN_SERVER_CONTEXT_H

#include <grpcpp/impl/codegen/server_context_impl.h>

namespace grpc {

typedef ::grpc_impl::ServerContext ServerContext;

#ifdef GRPC_CALLBACK_API_NONEXPERIMENTAL
typedef ::grpc_impl::ServerContextBase ServerContextBase;
typedef ::grpc_impl::CallbackServerContext CallbackServerContext;
#endif

// TODO(vjpai): Remove namespace experimental when de-experimentalized fully.
namespace experimental {

typedef ::grpc_impl::ServerContextBase ServerContextBase;
typedef ::grpc_impl::CallbackServerContext CallbackServerContext;

}  // namespace experimental
}  // namespace grpc

#endif  // GRPCPP_IMPL_CODEGEN_SERVER_CONTEXT_H
