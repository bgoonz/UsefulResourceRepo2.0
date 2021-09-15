
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
s.h>
#import <GRPCClient/internal_testing/GRPCCall+InternalTests.h>

#import "StressTests.h"

static NSString *const kHostAddress = @"10.0.0.1";

// The Protocol Buffers encoding overhead of local interop server. Acquired
// by experiment. Adjust this when server's proto file changes.
static int32_t kLocalInteropServerOverhead = 10;

/** Tests in InteropTests.m, sending the RPCs to a local cleartext server. */
@interface StressTestsCleartext : StressTests
@end

@implementation StressTestsCleartext

+ (NSString *)host {
  return [NSString stringWithFormat:@"%@:5050", kHostAddress];
}

+ (NSString *)hostAddress {
  return kHostAddress;
}

+ (NSString *)PEMRootCertificates {
  return nil;
}

+ (NSString *)hostNameOverride {
  return nil;
}

- (int32_t)encodingOverhead {
  return kLocalInteropServerOverhead;  // bytes
}

- (void)setUp {
  [super setUp];

  // Register test server as non-SSL.
  [GRPCCall useInsecureConnectionsForHost:[[self class] host]];
}

+ (GRPCTransportType)transportType {
  return GRPCTransportTypeInsecure;
}

@end
