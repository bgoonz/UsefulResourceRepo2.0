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
R_UTIL_H
#define GRPC_TEST_CORE_UTIL_FUZZER_UTIL_H

#include <stdint.h>

namespace grpc_core {

namespace testing {

// Main struct for input_stream. It allows easy access to input
// bytes, and allows reading a little past the end(avoiding
// needing to check everywhere).
typedef struct {
  const uint8_t* cur;
  const uint8_t* end;
} input_stream;

// get a byte from an input stream.
uint8_t grpc_fuzzer_get_next_byte(input_stream* inp);

// get a string and boolean values (if special is not null) from an input
// stream.
char* grpc_fuzzer_get_next_string(input_stream* inp, bool* special);

// get a uint32 value from an input stream.
uint32_t grpc_fuzzer_get_next_uint32(input_stream* inp);

}  // namespace testing
}  // namespace grpc_core

#endif /* GRPC_TEST_CORE_UTIL_FUZZER_UTIL_H */
