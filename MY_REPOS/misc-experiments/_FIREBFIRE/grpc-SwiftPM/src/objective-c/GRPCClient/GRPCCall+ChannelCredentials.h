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


/**
 * The interface is deprecated. Please use GRPCCallOptions instead for corresponding configurations.
 */
@interface GRPCCall (ChannelCredentials)

+ (BOOL)setTLSPEMRootCerts:(nullable NSString *)pemRootCert
                   forHost:(nonnull NSString *)host
                     error:(NSError *_Nullable *_Nullable)errorPtr;
+ (BOOL)setTLSPEMRootCerts:(nullable NSString *)pemRootCerts
            withPrivateKey:(nullable NSString *)pemPrivateKey
             withCertChain:(nullable NSString *)pemCertChain
                   forHost:(nonnull NSString *)host
                     error:(NSError *_Nullable *_Nullable)errorPtr;

@end
