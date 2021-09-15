/*
 *
 * Copyright 2015-2016 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *


#import "private/GRPCCore/GRPCHost.h"

#import "GRPCCallOptions.h"

@implementation GRPCCall (Tests)

+ (void)useTestCertsPath:(NSString *)certsPath
                testName:(NSString *)testName
                 forHost:(NSString *)host {
  if (!host) {
    [NSException raise:NSInvalidArgumentException format:@"host must be provided."];
  }
  if (!certsPath) {
    [NSException raise:NSInvalidArgumentException format:@"certpath be provided."];
  }
  if (!testName) {
    [NSException raise:NSInvalidArgumentException format:@"testname must be provided."];
  }
  NSError *error = nil;
  NSString *certs =
      [NSString stringWithContentsOfFile:certsPath encoding:NSUTF8StringEncoding error:&error];
  if (error != nil) {
    [NSException raise:[error localizedDescription] format:@"failed to load certs"];
  }

  GRPCHost *hostConfig = [GRPCHost hostWithAddress:host];
  [hostConfig setTLSPEMRootCerts:certs withPrivateKey:nil withCertChain:nil error:nil];
  hostConfig.hostNameOverride = testName;
}

+ (void)useInsecureConnectionsForHost:(NSString *)host {
  GRPCHost *hostConfig = [GRPCHost hostWithAddress:host];
  hostConfig.transportType = GRPCTransportTypeInsecure;
}

+ (void)resetHostSettings {
  [GRPCHost resetAllHostSettings];
}
@end
