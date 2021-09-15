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
_STRING_HELPERS_H
#define GRPC_CORE_LIB_SLICE_SLICE_STRING_HELPERS_H

#include <grpc/support/port_platform.h>

#include <stdbool.h>
#include <stddef.h>

#include <grpc/slice.h>
#include <grpc/slice_buffer.h>

#include "src/core/lib/gpr/string.h"

/* Calls gpr_dump on a slice. */
char* grpc_dump_slice(const grpc_slice& slice, uint32_t flags);
/* Calls gpr_dump on a slice and returns the result as a slice. */
grpc_slice grpc_dump_slice_to_slice(const grpc_slice& slice, uint32_t flags);

/** Split \a str by the separator \a sep. Results are stored in \a dst, which
 * should be a properly initialized instance. */
void grpc_slice_split(grpc_slice str, const char* sep, grpc_slice_buffer* dst);

/** Split \a str by the separator \a sep and remove the leading and trailing
 * spaces of each resulting token. Results are stored in \a dst, which should be
 * a properly initialized instance. */
void grpc_slice_split_without_space(grpc_slice str, const char* sep,
                                    grpc_slice_buffer* dst);

bool grpc_parse_slice_to_uint32(grpc_slice str, uint32_t* result);

#endif /* GRPC_CORE_LIB_SLICE_SLICE_STRING_HELPERS_H */
