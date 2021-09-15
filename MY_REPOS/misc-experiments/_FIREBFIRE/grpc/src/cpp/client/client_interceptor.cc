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
ent_interceptor.h>

namespace grpc {

namespace internal {
experimental::ClientInterceptorFactoryInterface*
    g_global_client_interceptor_factory = nullptr;
}

namespace experimental {
void RegisterGlobalClientInterceptorFactory(
    ClientInterceptorFactoryInterface* factory) {
  if (internal::g_global_client_interceptor_factory != nullptr) {
    GPR_ASSERT(false &&
               "It is illegal to call RegisterGlobalClientInterceptorFactory "
               "multiple times.");
  }
  internal::g_global_client_interceptor_factory = factory;
}

// For testing purposes only.
void TestOnlyResetGlobalClientInterceptorFactory() {
  internal::g_global_client_interceptor_factory = nullptr;
}
}  // namespace experimental
}  // namespace grpc
