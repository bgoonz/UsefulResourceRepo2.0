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
TEXT_H
#define GRPC_CORE_LIB_CHANNEL_CONTEXT_H

/// Call object context pointers.

/// Call context is represented as an array of \a grpc_call_context_elements.
/// This enum represents the indexes into the array, where each index
/// contains a different type of value.
typedef enum {
  /// Value is either a \a grpc_client_security_context or a
  /// \a grpc_server_security_context.
  GRPC_CONTEXT_SECURITY = 0,

  /// Value is a \a census_context.
  GRPC_CONTEXT_TRACING,

  /// Reserved for traffic_class_context.
  GRPC_CONTEXT_TRAFFIC,

  /// Holds a pointer to ServiceConfigCallData associated with this call.
  GRPC_CONTEXT_SERVICE_CONFIG_CALL_DATA,

  GRPC_CONTEXT_COUNT
} grpc_context_index;

struct grpc_call_context_element {
  void* value = nullptr;
  void (*destroy)(void*) = nullptr;
};

#endif /* GRPC_CORE_LIB_CHANNEL_CONTEXT_H */
