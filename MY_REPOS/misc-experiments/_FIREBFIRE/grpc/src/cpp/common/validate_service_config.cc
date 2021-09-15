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

#include <grpcpp/support/validate_service_config.h>

#include "src/core/ext/filters/client_channel/service_config.h"

namespace grpc {
namespace experimental {
std::string ValidateServiceConfigJSON(const std::string& service_config_json) {
  grpc_init();
  grpc_error* error = GRPC_ERROR_NONE;
  grpc_core::ServiceConfig::Create(service_config_json.c_str(), &error);
  std::string return_value;
  if (error != GRPC_ERROR_NONE) {
    return_value = grpc_error_string(error);
    GRPC_ERROR_UNREF(error);
  }
  grpc_shutdown();
  return return_value;
}
}  // namespace experimental
}  // namespace grpc
