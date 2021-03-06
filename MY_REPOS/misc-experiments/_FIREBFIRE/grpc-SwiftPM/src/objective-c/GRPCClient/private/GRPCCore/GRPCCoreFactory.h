/*
 *
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
.h>

NS_ASSUME_NONNULL_BEGIN

@protocol GRPCChannelFactory;
@protocol GRPCCallOptions;

/** The interface for transport implementations that are based on Core. */
@protocol GRPCCoreTransportFactory<GRPCTransportFactory>

/** Get the channel factory for GRPCChannel from call options. */
- (nullable id<GRPCChannelFactory>)createCoreChannelFactoryWithCallOptions:
    (GRPCCallOptions *)callOptions;

@end

/** The factory for gRPC Core + CFStream + TLS secure channel transport implementation. */
@interface GRPCCoreSecureFactory : NSObject<GRPCCoreTransportFactory>

@end

/** The factory for gRPC Core + CFStream + insecure channel transport implementation. */
@interface GRPCCoreInsecureFactory : NSObject<GRPCCoreTransportFactory>

@end

NS_ASSUME_NONNULL_END
