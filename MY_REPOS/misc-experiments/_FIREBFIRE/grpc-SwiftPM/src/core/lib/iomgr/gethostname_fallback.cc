/*
 *
 * Copyright 2017 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
orm.h>

#include "src/core/lib/iomgr/gethostname.h"
#include "src/core/lib/iomgr/port.h"

#ifdef GRPC_GETHOSTNAME_FALLBACK

#include <stddef.h>

char* grpc_gethostname() { return NULL; }

#endif  // GRPC_GETHOSTNAME_FALLBACK
