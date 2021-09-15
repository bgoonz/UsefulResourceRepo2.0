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

#ifdef GPR_PTHREAD_TLS

#include "src/core/lib/gpr/tls.h"

intptr_t gpr_tls_set(struct gpr_pthread_thread_local* tls, intptr_t value) {
  GPR_ASSERT(0 == pthread_setspecific(tls->key, (void*)value));
  return value;
}

#endif /* GPR_PTHREAD_TLS */
