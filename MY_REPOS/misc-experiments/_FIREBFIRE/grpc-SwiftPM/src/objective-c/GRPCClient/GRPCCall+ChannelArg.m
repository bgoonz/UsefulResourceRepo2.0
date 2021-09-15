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


#import "private/GRPCCore/GRPCChannelPool.h"
#import "private/GRPCCore/GRPCHost.h"

#import <grpc/impl/codegen/compression_types.h>

@implementation GRPCCall (ChannelArg)

+ (void)setUserAgentPrefix:(nonnull NSString *)userAgentPrefix forHost:(nonnull NSString *)host {
  GRPCHost *hostConfig = [GRPCHost hostWithAddress:host];
  hostConfig.userAgentPrefix = userAgentPrefix;
}

+ (void)setResponseSizeLimit:(NSUInteger)limit forHost:(nonnull NSString *)host {
  GRPCHost *hostConfig = [GRPCHost hostWithAddress:host];
  hostConfig.responseSizeLimitOverride = limit;
}

+ (void)closeOpenConnections {
  [[GRPCChannelPool sharedInstance] disconnectAllChannels];
}

+ (void)setDefaultCompressMethod:(GRPCCompressAlgorithm)algorithm forhost:(nonnull NSString *)host {
  GRPCHost *hostConfig = [GRPCHost hostWithAddress:host];
  switch (algorithm) {
    case GRPCCompressNone:
      hostConfig.compressAlgorithm = GRPC_COMPRESS_NONE;
      break;
    case GRPCCompressDeflate:
      hostConfig.compressAlgorithm = GRPC_COMPRESS_DEFLATE;
      break;
    case GRPCCompressGzip:
      hostConfig.compressAlgorithm = GRPC_COMPRESS_GZIP;
      break;
    default:
      NSLog(@"Invalid compression algorithm");
      abort();
  }
}

+ (void)setKeepaliveWithInterval:(int)interval
                         timeout:(int)timeout
                         forHost:(nonnull NSString *)host {
  GRPCHost *hostConfig = [GRPCHost hostWithAddress:host];
  hostConfig.keepaliveInterval = interval;
  hostConfig.keepaliveTimeout = timeout;
}

+ (void)enableRetry:(BOOL)enabled forHost:(nonnull NSString *)host {
  GRPCHost *hostConfig = [GRPCHost hostWithAddress:host];
  hostConfig.retryEnabled = enabled;
}

+ (void)setMinConnectTimeout:(unsigned int)timeout
              initialBackoff:(unsigned int)initialBackoff
                  maxBackoff:(unsigned int)maxBackoff
                     forHost:(nonnull NSString *)host {
  GRPCHost *hostConfig = [GRPCHost hostWithAddress:host];
  hostConfig.minConnectTimeout = timeout;
  hostConfig.initialConnectBackoff = initialBackoff;
  hostConfig.maxConnectBackoff = maxBackoff;
}

@end
