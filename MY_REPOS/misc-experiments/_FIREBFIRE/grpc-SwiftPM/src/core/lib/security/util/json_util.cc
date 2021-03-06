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

#include "src/core/lib/iomgr/error.h"
#include "src/core/lib/security/util/json_util.h"

#include <string.h>

#include <grpc/support/log.h>
#include <grpc/support/string_util.h>

const char* grpc_json_get_string_property(const grpc_core::Json& json,
                                          const char* prop_name,
                                          grpc_error** error) {
  if (json.type() != grpc_core::Json::Type::OBJECT) {
    if (error != nullptr) {
      *error =
          GRPC_ERROR_CREATE_FROM_STATIC_STRING("JSON value is not an object");
    }
    return nullptr;
  }
  auto it = json.object_value().find(prop_name);
  if (it == json.object_value().end()) {
    if (error != nullptr) {
      char* error_msg;
      gpr_asprintf(&error_msg, "Property %s not found in JSON object.",
                   prop_name);
      *error = GRPC_ERROR_CREATE_FROM_COPIED_STRING(error_msg);
      gpr_free(error_msg);
    }
    return nullptr;
  }
  if (it->second.type() != grpc_core::Json::Type::STRING) {
    if (error != nullptr) {
      char* error_msg;
      gpr_asprintf(&error_msg, "Property %s in JSON object is not a string.",
                   prop_name);
      *error = GRPC_ERROR_CREATE_FROM_COPIED_STRING(error_msg);
      gpr_free(error_msg);
    }
    return nullptr;
  }
  return it->second.string_value().c_str();
}

bool grpc_copy_json_string_property(const grpc_core::Json& json,
                                    const char* prop_name,
                                    char** copied_value) {
  grpc_error* error = GRPC_ERROR_NONE;
  const char* prop_value =
      grpc_json_get_string_property(json, prop_name, &error);
  GRPC_LOG_IF_ERROR("Could not copy JSON property", error);
  if (prop_value == nullptr) return false;
  *copied_value = gpr_strdup(prop_value);
  return true;
}
