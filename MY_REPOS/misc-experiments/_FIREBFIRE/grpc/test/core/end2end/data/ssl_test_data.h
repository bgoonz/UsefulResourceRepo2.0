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
TA_SSL_TEST_DATA_H
#define GRPC_TEST_CORE_END2END_DATA_SSL_TEST_DATA_H

// These credentials are hardcoded as char arrays and are hence considered to
// be deprecated. Please consider using credentials in
// "src/core/tsi/test_creds" instead.

extern const char test_root_cert[];
extern const char test_server1_cert[];
extern const char test_server1_key[];
extern const char test_self_signed_client_cert[];
extern const char test_self_signed_client_key[];
extern const char test_signed_client_cert[];
extern const char test_signed_client_key[];

#endif /* GRPC_TEST_CORE_END2END_DATA_SSL_TEST_DATA_H */
