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

#define GRPC_CORE_LIB_GPR_ENV_H

#include <grpc/support/port_platform.h>

#include <stdio.h>

/* Env utility functions */

/* Gets the environment variable value with the specified name.
   Returns a newly allocated string. It is the responsibility of the caller to
   gpr_free the return value if not NULL (which means that the environment
   variable exists). */
char* gpr_getenv(const char* name);

/* Sets the environment with the specified name to the specified value. */
void gpr_setenv(const char* name, const char* value);

/* Deletes the variable name from the environment. */
void gpr_unsetenv(const char* name);

#endif /* GRPC_CORE_LIB_GPR_ENV_H */
