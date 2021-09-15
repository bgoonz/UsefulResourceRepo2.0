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
IL_JSON_UTIL_H
#define GRPC_CORE_LIB_SECURITY_UTIL_JSON_UTIL_H

#include <grpc/support/port_platform.h>

#include <stdbool.h>

#include "src/core/lib/iomgr/error.h"
#include "src/core/lib/json/json.h"

// Constants.
#define GRPC_AUTH_JSON_TYPE_INVALID "invalid"
#define GRPC_AUTH_JSON_TYPE_SERVICE_ACCOUNT "service_account"
#define GRPC_AUTH_JSON_TYPE_AUTHORIZED_USER "authorized_user"

// Gets a child property from a json node.
const char* grpc_json_get_string_property(const grpc_core::Json& json,
                                          const char* prop_name,
                                          grpc_error** error);

// Copies the value of the json child property specified by prop_name.
// Returns false if the property was not found.
bool grpc_copy_json_string_property(const grpc_core::Json& json,
                                    const char* prop_name, char** copied_value);

#endif /* GRPC_CORE_LIB_SECURITY_UTIL_JSON_UTIL_H */
