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


#include <grpc/impl/codegen/grpc_types.h>

/** Free resources in the grpc core struct grpc_channel_args */
void GRPCFreeChannelArgs(grpc_channel_args* channel_args);

/**
 * Allocates a @c grpc_channel_args and populates it with the options specified
 * in the
 * @c dictionary. Keys must be @c NSString, @c NSNumber, or a pointer. If the
 * value responds to
 * @c @selector(UTF8String) then it will be mapped to @c GRPC_ARG_STRING. If the
 * value responds to
 * @c @selector(intValue), it will be mapped to @c GRPC_ARG_INTEGER. Otherwise,
 * if the value is not nil, it is mapped as a pointer. The caller of this
 * function is responsible for calling
 * @c GRPCFreeChannelArgs to free the @c grpc_channel_args struct.
 */
grpc_channel_args* GRPCBuildChannelArgs(NSDictionary* dictionary);
