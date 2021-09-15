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


#include <AvailabilityMacros.h>

/**
 * The interface is deprecated. Please use GRPCCallOptions instead for corresponding configurations.
 */
@interface GRPCCall (ChannelArg)

+ (void)setUserAgentPrefix:(nonnull NSString *)userAgentPrefix forHost:(nonnull NSString *)host;
+ (void)setResponseSizeLimit:(NSUInteger)limit forHost:(nonnull NSString *)host;
+ (void)closeOpenConnections DEPRECATED_MSG_ATTRIBUTE("The API for this feature is experimental, "
                                                      "and might be removed or modified at any "
                                                      "time.");
+ (void)setDefaultCompressMethod:(GRPCCompressAlgorithm)algorithm forhost:(nonnull NSString *)host;
+ (void)setKeepaliveWithInterval:(int)interval
                         timeout:(int)timeout
                         forHost:(nonnull NSString *)host;
+ (void)enableRetry:(BOOL)enabled forHost:(nonnull NSString *)host;
+ (void)setMinConnectTimeout:(unsigned int)timeout
              initialBackoff:(unsigned int)initialBackoff
                  maxBackoff:(unsigned int)maxBackoff
                     forHost:(nonnull NSString *)host;

@end
