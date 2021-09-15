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
ERVICE_CONFIG_H
#define GRPCPP_SUPPORT_VALIDATE_SERVICE_CONFIG_H

#include <grpcpp/support/config.h>

namespace grpc {

namespace experimental {
/// Validates \a service_config_json. If valid, returns an empty string.
/// Otherwise, returns the validation error.
/// TODO(yashykt): Promote it to out of experimental once it is proved useful
/// and gRFC is accepted.
std::string ValidateServiceConfigJSON(const std::string& service_config_json);
}  // namespace experimental

}  // namespace grpc

#endif  // GRPCPP_SUPPORT_VALIDATE_SERVICE_CONFIG_H
