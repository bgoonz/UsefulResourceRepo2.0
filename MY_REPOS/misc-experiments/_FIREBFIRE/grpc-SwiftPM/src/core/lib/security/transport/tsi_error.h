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
ANSPORT_TSI_ERROR_H
#define GRPC_CORE_LIB_SECURITY_TRANSPORT_TSI_ERROR_H

#include <grpc/support/port_platform.h>

#include "src/core/lib/iomgr/error.h"
#include "src/core/tsi/transport_security_interface.h"

grpc_error* grpc_set_tsi_error_result(grpc_error* error, tsi_result result);

#endif /* GRPC_CORE_LIB_SECURITY_TRANSPORT_TSI_ERROR_H */
