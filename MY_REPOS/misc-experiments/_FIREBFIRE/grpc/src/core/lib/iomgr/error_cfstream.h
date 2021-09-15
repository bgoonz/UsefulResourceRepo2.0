/*
 *
 * Copyright 2018 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
_CFSTREAM_H
#define GRPC_CORE_LIB_IOMGR_ERROR_CFSTREAM_H

#ifdef GRPC_CFSTREAM
// Create an error from Apple Core Foundation CFError object
#define GRPC_ERROR_CREATE_FROM_CFERROR(error, desc)  \
  grpc_error_create_from_cferror(__FILE__, __LINE__, \
                                 static_cast<void*>((error)), (desc))
grpc_error* grpc_error_create_from_cferror(const char* file, int line,
                                           void* arg, const char* desc);
#endif /* GRPC_CFSTREAM */

#endif /* GRPC_CORE_LIB_IOMGR_ERROR_CFSTREAM_H */
