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

NS_ASSUME_NONNULL_BEGIN

/** A factory interface which generates new channel. */
@protocol GRPCChannelFactory

/** Create a channel with specific channel args to a specific host. */
- (nullable grpc_channel *)createChannelWithHost:(NSString *)host
                                     channelArgs:(nullable NSDictionary *)args;

@end

NS_ASSUME_NONNULL_END
