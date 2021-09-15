/*
 *
 * Copyright 2017 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
ILS_H
#define GRPCPP_SUPPORT_ERROR_DETAILS_H

#include <grpcpp/support/error_details_impl.h>

namespace google {
namespace rpc {
class Status;
}  // namespace rpc
}  // namespace google

namespace grpc {

static inline Status ExtractErrorDetails(const Status& from,
                                         ::google::rpc::Status* to) {
  return ::grpc_impl::ExtractErrorDetails(from, to);
}

static inline Status SetErrorDetails(const ::google::rpc::Status& from,
                                     Status* to) {
  return ::grpc_impl::SetErrorDetails(from, to);
}

}  // namespace grpc

#endif  // GRPCPP_SUPPORT_ERROR_DETAILS_H
