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
als.h"

#import "private/GRPCCore/GRPCHost.h"

@implementation GRPCCall (ChannelCredentials)

+ (BOOL)setTLSPEMRootCerts:(nullable NSString *)pemRootCerts
            withPrivateKey:(nullable NSString *)pemPrivateKey
             withCertChain:(nullable NSString *)pemCertChain
                   forHost:(nonnull NSString *)host
                     error:(NSError **)errorPtr {
  if (!host) {
    [NSException raise:NSInvalidArgumentException format:@"host must be provided."];
  }
  GRPCHost *hostConfig = [GRPCHost hostWithAddress:host];
  return [hostConfig setTLSPEMRootCerts:pemRootCerts
                         withPrivateKey:pemPrivateKey
                          withCertChain:pemCertChain
                                  error:errorPtr];
}

+ (BOOL)setTLSPEMRootCerts:(nullable NSString *)pemRootCerts
                   forHost:(nonnull NSString *)host
                     error:(NSError **)errorPtr {
  return [GRPCCall setTLSPEMRootCerts:pemRootCerts
                       withPrivateKey:nil
                        withCertChain:nil
                              forHost:host
                                error:errorPtr];
}

@end
