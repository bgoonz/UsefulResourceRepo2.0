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
NS_H_
#define GRPC_RB_COMPRESSION_OPTIONS_H_

#include <ruby/ruby.h>

#include <grpc/grpc.h>

/* Initializes the compression options ruby wrapper. */
void Init_grpc_compression_options();

#endif /* GRPC_RB_COMPRESSION_OPTIONS_H_ */
