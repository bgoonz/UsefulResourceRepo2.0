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
vice_interface.h>

namespace grpc {
namespace {
bool g_grpc_default_health_check_service_enabled = false;
}  // namespace

bool DefaultHealthCheckServiceEnabled() {
  return g_grpc_default_health_check_service_enabled;
}

void EnableDefaultHealthCheckService(bool enable) {
  g_grpc_default_health_check_service_enabled = enable;
}

}  // namespace grpc
