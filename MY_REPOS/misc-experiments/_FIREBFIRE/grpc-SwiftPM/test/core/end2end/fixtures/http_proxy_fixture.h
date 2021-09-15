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
XTURES_HTTP_PROXY_FIXTURE_H
#define GRPC_TEST_CORE_END2END_FIXTURES_HTTP_PROXY_FIXTURE_H

#include <grpc/grpc.h>

/* The test credentials being used for HTTP Proxy Authorization */
#define GRPC_TEST_HTTP_PROXY_AUTH_CREDS "aladdin:opensesame"

/* A channel arg key used to indicate that the channel uses proxy authorization.
 * The value (string) should be the proxy auth credentials that should be
 * checked.
 */
#define GRPC_ARG_HTTP_PROXY_AUTH_CREDS "grpc.test.proxy_auth"

typedef struct grpc_end2end_http_proxy grpc_end2end_http_proxy;

grpc_end2end_http_proxy* grpc_end2end_http_proxy_create(
    grpc_channel_args* args);

void grpc_end2end_http_proxy_destroy(grpc_end2end_http_proxy* proxy);

const char* grpc_end2end_http_proxy_get_proxy_name(
    grpc_end2end_http_proxy* proxy);

#endif /* GRPC_TEST_CORE_END2END_FIXTURES_HTTP_PROXY_FIXTURE_H */
