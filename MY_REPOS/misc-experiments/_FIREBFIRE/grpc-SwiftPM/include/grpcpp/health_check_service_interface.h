/*
 *
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
CE_INTERFACE_H
#define GRPCPP_HEALTH_CHECK_SERVICE_INTERFACE_H

#include <grpcpp/health_check_service_interface_impl.h>

namespace grpc {

const char kHealthCheckServiceInterfaceArg[] =
    "grpc.health_check_service_interface";

typedef ::grpc_impl::HealthCheckServiceInterface HealthCheckServiceInterface;

static inline void EnableDefaultHealthCheckService(bool enable) {
  ::grpc_impl::EnableDefaultHealthCheckService(enable);
}

static inline bool DefaultHealthCheckServiceEnabled() {
  return ::grpc_impl::DefaultHealthCheckServiceEnabled();
}

}  // namespace grpc

#endif  // GRPCPP_HEALTH_CHECK_SERVICE_INTERFACE_H
