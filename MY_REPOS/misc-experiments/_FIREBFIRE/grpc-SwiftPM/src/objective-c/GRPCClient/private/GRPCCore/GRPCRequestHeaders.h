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


#import <GRPCClient/GRPCCallLegacy.h>

@interface GRPCRequestHeaders : NSMutableDictionary

- (instancetype)initWithCall:(GRPCCall *)call;

- (instancetype)initWithCall:(GRPCCall *)call
                     storage:(NSMutableDictionary *)storage NS_DESIGNATED_INITIALIZER;

@end
