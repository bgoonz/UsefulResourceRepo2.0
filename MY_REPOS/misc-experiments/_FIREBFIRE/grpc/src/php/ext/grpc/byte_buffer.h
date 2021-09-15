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
FFER_H_
#define NET_GRPC_PHP_GRPC_BYTE_BUFFER_H_

#include <grpc/grpc.h>

grpc_byte_buffer *string_to_byte_buffer(char *string, size_t length);

#if PHP_MAJOR_VERSION < 7
void byte_buffer_to_string(grpc_byte_buffer *buffer, char **out_string,
                           size_t *out_length);
#else
zend_string* byte_buffer_to_zend_string(grpc_byte_buffer *buffer);
#endif // PHP_MAJOR_VERSION < 7

#endif /* NET_GRPC_PHP_GRPC_BYTE_BUFFER_H_ */
