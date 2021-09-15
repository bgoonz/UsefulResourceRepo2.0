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
AUTH2_UTILS_H
#define GRPC_TEST_CORE_SECURITY_OAUTH2_UTILS_H

#include "src/core/lib/security/credentials/credentials.h"

/* Fetch oauth2 access token with a credentials object. Does not take ownership.
   Returns NULL on a failure. The caller should call gpr_free on the token. */
char* grpc_test_fetch_oauth2_token_with_credentials(
    grpc_call_credentials* creds);

#endif /* GRPC_TEST_CORE_SECURITY_OAUTH2_UTILS_H */
