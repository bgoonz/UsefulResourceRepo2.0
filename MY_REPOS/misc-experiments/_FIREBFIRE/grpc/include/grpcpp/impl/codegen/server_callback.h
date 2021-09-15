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
R_CALLBACK_H
#define GRPCPP_IMPL_CODEGEN_SERVER_CALLBACK_H

#include <grpcpp/impl/codegen/server_callback_impl.h>

namespace grpc {

#ifdef GRPC_CALLBACK_API_NONEXPERIMENTAL
template <class Request>
using ServerReadReactor = ::grpc_impl::ServerReadReactor<Request>;

template <class Response>
using ServerWriteReactor = ::grpc_impl::ServerWriteReactor<Response>;

template <class Request, class Response>
using ServerBidiReactor = ::grpc_impl::ServerBidiReactor<Request, Response>;

using ServerUnaryReactor = ::grpc_impl::ServerUnaryReactor;
#endif

// TODO(vjpai): Remove namespace experimental when de-experimentalized fully.
namespace experimental {

template <class Request>
using ServerReadReactor = ::grpc_impl::ServerReadReactor<Request>;

template <class Response>
using ServerWriteReactor = ::grpc_impl::ServerWriteReactor<Response>;

template <class Request, class Response>
using ServerBidiReactor = ::grpc_impl::ServerBidiReactor<Request, Response>;

using ServerUnaryReactor = ::grpc_impl::ServerUnaryReactor;

}  // namespace experimental
}  // namespace grpc

#endif  // GRPCPP_IMPL_CODEGEN_SERVER_CALLBACK_H
