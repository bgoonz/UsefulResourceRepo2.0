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
orm.h>

#include "src/core/ext/filters/client_channel/resolver.h"

grpc_core::DebugOnlyTraceFlag grpc_trace_resolver_refcount(false,
                                                           "resolver_refcount");

namespace grpc_core {

//
// Resolver
//

Resolver::Resolver(std::shared_ptr<WorkSerializer> work_serializer,
                   std::unique_ptr<ResultHandler> result_handler)
    : InternallyRefCounted(&grpc_trace_resolver_refcount),
      work_serializer_(std::move(work_serializer)),
      result_handler_(std::move(result_handler)) {}

//
// Resolver::Result
//

Resolver::Result::~Result() {
  GRPC_ERROR_UNREF(service_config_error);
  grpc_channel_args_destroy(args);
}

Resolver::Result::Result(const Result& other) {
  addresses = other.addresses;
  service_config = other.service_config;
  service_config_error = GRPC_ERROR_REF(other.service_config_error);
  args = grpc_channel_args_copy(other.args);
}

Resolver::Result::Result(Result&& other) noexcept {
  addresses = std::move(other.addresses);
  service_config = std::move(other.service_config);
  service_config_error = other.service_config_error;
  other.service_config_error = GRPC_ERROR_NONE;
  args = other.args;
  other.args = nullptr;
}

Resolver::Result& Resolver::Result::operator=(const Result& other) {
  addresses = other.addresses;
  service_config = other.service_config;
  GRPC_ERROR_UNREF(service_config_error);
  service_config_error = GRPC_ERROR_REF(other.service_config_error);
  grpc_channel_args_destroy(args);
  args = grpc_channel_args_copy(other.args);
  return *this;
}

Resolver::Result& Resolver::Result::operator=(Result&& other) noexcept {
  addresses = std::move(other.addresses);
  service_config = std::move(other.service_config);
  GRPC_ERROR_UNREF(service_config_error);
  service_config_error = other.service_config_error;
  other.service_config_error = GRPC_ERROR_NONE;
  grpc_channel_args_destroy(args);
  args = other.args;
  other.args = nullptr;
  return *this;
}

}  // namespace grpc_core
