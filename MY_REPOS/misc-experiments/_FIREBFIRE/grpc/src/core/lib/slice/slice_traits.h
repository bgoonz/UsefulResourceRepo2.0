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
_TRAITS_H
#define GRPC_CORE_LIB_SLICE_SLICE_TRAITS_H

#include <grpc/support/port_platform.h>

#include <grpc/slice.h>
#include <stdbool.h>

bool grpc_slice_is_legal_header(const grpc_slice& s);
bool grpc_slice_is_legal_nonbin_header(const grpc_slice& s);
bool grpc_slice_is_bin_suffixed(const grpc_slice& s);

#endif /* GRPC_CORE_LIB_SLICE_SLICE_TRAITS_H */
