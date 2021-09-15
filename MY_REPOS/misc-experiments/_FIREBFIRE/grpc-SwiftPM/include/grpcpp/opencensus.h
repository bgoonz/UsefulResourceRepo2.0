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

#define GRPCPP_OPENCENSUS_H

#include "grpcpp/opencensus_impl.h"

namespace grpc {

static inline void RegisterOpenCensusPlugin() {
  ::grpc_impl::RegisterOpenCensusPlugin();
}
static inline void RegisterOpenCensusViewsForExport() {
  ::grpc_impl::RegisterOpenCensusViewsForExport();
}
static inline ::opencensus::trace::Span GetSpanFromServerContext(
    ::grpc_impl::ServerContext* context) {
  return ::grpc_impl::GetSpanFromServerContext(context);
}

}  // namespace grpc

#endif  // GRPCPP_OPENCENSUS_H
