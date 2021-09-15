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

#define GRPC_RB_BYTE_BUFFER_H_

#include <ruby/ruby.h>

#include <grpc/grpc.h>

/* Converts a char* with a length to a grpc_byte_buffer */
grpc_byte_buffer* grpc_rb_s_to_byte_buffer(char* string, size_t length);

/* Converts a grpc_byte_buffer to a ruby string */
VALUE grpc_rb_byte_buffer_to_s(grpc_byte_buffer* buffer);

/* Converts a grpc_slice to a ruby string */
VALUE grpc_rb_slice_to_ruby_string(grpc_slice slice);

#endif /* GRPC_RB_BYTE_BUFFER_H_ */
