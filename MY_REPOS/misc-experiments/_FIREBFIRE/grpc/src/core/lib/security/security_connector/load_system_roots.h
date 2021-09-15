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
CURITY_CONNECTOR_LOAD_SYSTEM_ROOTS_H
#define GRPC_CORE_LIB_SECURITY_SECURITY_CONNECTOR_LOAD_SYSTEM_ROOTS_H

namespace grpc_core {

// Returns a slice containing roots from the OS trust store
grpc_slice LoadSystemRootCerts();

}  // namespace grpc_core

#endif /* GRPC_CORE_LIB_SECURITY_SECURITY_CONNECTOR_LOAD_SYSTEM_ROOTS_H */
