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
_UNARY_CALL_H
#define GRPCPP_IMPL_CODEGEN_ASYNC_UNARY_CALL_H

#include <grpcpp/impl/codegen/async_unary_call_impl.h>

namespace grpc {

template <class R>
using ClientAsyncResponseReaderInterface =
    grpc_impl::ClientAsyncResponseReaderInterface<R>;

template <class R>
using ClientAsyncResponseReader = grpc_impl::ClientAsyncResponseReader<R>;

template <class W>
using ServerAsyncResponseWriter = ::grpc_impl::ServerAsyncResponseWriter<W>;

namespace internal {

template <class R>
using ClientAsyncResponseReaderFactory =
    ::grpc_impl::internal::ClientAsyncResponseReaderFactory<R>;

}  // namespace internal

}  // namespace grpc

#endif  // GRPCPP_IMPL_CODEGEN_ASYNC_UNARY_CALL_H
