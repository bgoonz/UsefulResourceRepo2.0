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

@interface NSDictionary (GRPC)
+ (instancetype)grpc_dictionaryFromMetadataArray:(grpc_metadata_array)array;
+ (instancetype)grpc_dictionaryFromMetadata:(grpc_metadata *)entries count:(size_t)count;
- (grpc_metadata *)grpc_metadataArray;
@end
