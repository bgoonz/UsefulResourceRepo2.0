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
RONET_TRANSPORT_CRONET_TRANSPORT_H
#define GRPC_CORE_EXT_TRANSPORT_CRONET_TRANSPORT_CRONET_TRANSPORT_H

#include <grpc/support/port_platform.h>

#include "src/core/lib/transport/transport.h"

grpc_transport* grpc_create_cronet_transport(void* engine, const char* target,
                                             const grpc_channel_args* args,
                                             void* reserved);

#endif /* GRPC_CORE_EXT_TRANSPORT_CRONET_TRANSPORT_CRONET_TRANSPORT_H */
