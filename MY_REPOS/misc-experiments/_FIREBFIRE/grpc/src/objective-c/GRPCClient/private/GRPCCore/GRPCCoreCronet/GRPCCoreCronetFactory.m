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


#import <GRPCClient/GRPCCall+Cronet.h>
#import <GRPCClient/GRPCTransport.h>

#import "../GRPCCallInternal.h"
#import "../GRPCCoreFactory.h"
#import "GRPCCronetChannelFactory.h"

static GRPCCoreCronetFactory *gGRPCCoreCronetFactory = nil;
static dispatch_once_t gInitGRPCCoreCronetFactory;

@implementation GRPCCoreCronetFactory

+ (instancetype)sharedInstance {
  dispatch_once(&gInitGRPCCoreCronetFactory, ^{
    gGRPCCoreCronetFactory = [[GRPCCoreCronetFactory alloc] init];
  });
  return gGRPCCoreCronetFactory;
}

+ (void)load {
  [[GRPCTransportRegistry sharedInstance]
      registerTransportWithID:gGRPCCoreCronetID
                      factory:[GRPCCoreCronetFactory sharedInstance]];
}

- (GRPCTransport *)createTransportWithManager:(GRPCTransportManager *)transportManager {
  return [[GRPCCall2Internal alloc] initWithTransportManager:transportManager];
}

- (NSArray<id<GRPCInterceptorFactory>> *)transportInterceptorFactories {
  return nil;
}

- (id<GRPCChannelFactory>)createCoreChannelFactoryWithCallOptions:(GRPCCallOptions *)callOptions {
  return [GRPCCronetChannelFactory sharedInstance];
}

@end
