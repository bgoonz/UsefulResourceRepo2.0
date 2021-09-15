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
RVER_H
#define GRPC_TEST_CORE_BAD_SSL_SERVER_H

#include <grpc/grpc.h>

const char* bad_ssl_addr(int argc, char** argv);
void bad_ssl_run(grpc_server* server);

#endif /* GRPC_TEST_CORE_BAD_SSL_SERVER_H */
