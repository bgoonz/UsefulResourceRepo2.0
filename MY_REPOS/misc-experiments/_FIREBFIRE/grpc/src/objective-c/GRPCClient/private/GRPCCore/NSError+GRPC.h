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

#include <grpc/grpc.h>

@interface NSError (GRPC)
/**
 * Returns nil if the status code is OK. Otherwise, a NSError whose code is one of |GRPCErrorCode|
 * and whose domain is |kGRPCErrorDomain|.
 */
+ (instancetype)grpc_errorFromStatusCode:(grpc_status_code)statusCode
                                 details:(const char *)details
                             errorString:(const char *)errorString;
@end
