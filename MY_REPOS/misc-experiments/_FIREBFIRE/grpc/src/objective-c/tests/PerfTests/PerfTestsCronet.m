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

#import <Cronet/Cronet.h>
#import <GRPCClient/GRPCCall+Cronet.h>

#import "../ConfigureCronet.h"
#import "PerfTests.h"

// The server address is derived from preprocessor macro, which is
// in turn derived from environment variable of the same name.
#define NSStringize_helper(x) #x
#define NSStringize(x) @NSStringize_helper(x)
static NSString *const kLocalSSLHost = NSStringize(HOST_PORT_LOCALSSL);

// The Protocol Buffers encoding overhead of remote interop server. Acquired
// by experiment. Adjust this when server's proto file changes.
static int32_t kRemoteInteropServerOverhead = 12;

/** Tests in PerfTests.m, sending the RPCs to a remote SSL server. */
@interface PerfTestsCronet : PerfTests
@end

@implementation PerfTestsCronet

+ (void)setUp {
  configureCronet(/*enable_netlog=*/false);
  [GRPCCall useCronetWithEngine:[Cronet getGlobalEngine]];

  [super setUp];
}

+ (NSString *)host {
  return kLocalSSLHost;
}

+ (GRPCTransportID)transport {
  return gGRPCCoreCronetID;
}

- (int32_t)encodingOverhead {
  return kRemoteInteropServerOverhead;  // bytes
}

@end
