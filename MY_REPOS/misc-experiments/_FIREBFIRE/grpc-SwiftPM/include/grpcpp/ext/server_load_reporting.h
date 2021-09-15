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
PORTING_H
#define GRPCPP_EXT_SERVER_LOAD_REPORTING_H

#include <grpcpp/ext/server_load_reporting_impl.h>

namespace grpc {
namespace load_reporter {
namespace experimental {

typedef ::grpc_impl::load_reporter::experimental::
    LoadReportingServiceServerBuilderOption
        LoadReportingServiceServerBuilderOption;

static inline void AddLoadReportingCost(grpc::ServerContext* ctx,
                                        const grpc::string& cost_name,
                                        double cost_value) {
  ::grpc_impl::load_reporter::experimental::AddLoadReportingCost(ctx, cost_name,
                                                                 cost_value);
}

}  // namespace experimental
}  // namespace load_reporter
}  // namespace grpc

#endif  // GRPCPP_EXT_SERVER_LOAD_REPORTING_H
