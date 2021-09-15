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

@class GRPCChannel;
typedef struct stream_engine stream_engine;

NS_ASSUME_NONNULL_BEGIN

@interface GRPCCronetChannelFactory : NSObject <GRPCChannelFactory>

+ (nullable instancetype)sharedInstance;

- (nullable grpc_channel *)createChannelWithHost:(NSString *)host
                                     channelArgs:(nullable NSDictionary *)args;

- (nullable instancetype)init NS_UNAVAILABLE;

@end

NS_ASSUME_NONNULL_END
