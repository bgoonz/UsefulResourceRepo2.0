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
m:
   templates/src/core/surface/version.c.template */

#include <grpc/support/port_platform.h>

#include <grpc/grpc.h>

const char* grpc_version_string(void) { return "11.0.0"; }

const char* grpc_g_stands_for(void) { return "giggle"; }
