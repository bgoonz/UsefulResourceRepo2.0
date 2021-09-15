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
#import "src/objective-c/GRPCClient/private/GRPCTransport+Private.h"

@interface TransportRegistryTests : XCTestCase

@end

@implementation TransportRegistryTests

- (void)testCronetImplementationExist {
  id<GRPCTransportFactory> secureTransportFactory = [[GRPCTransportRegistry sharedInstance]
      getTransportFactoryWithID:GRPCDefaultTransportImplList.core_secure];
  id<GRPCTransportFactory> cronetTransportFactory =
      [[GRPCTransportRegistry sharedInstance] getTransportFactoryWithID:gGRPCCoreCronetID];
  XCTAssertNotNil(secureTransportFactory);
  XCTAssertNotNil(cronetTransportFactory);
  XCTAssertNotEqual(secureTransportFactory, cronetTransportFactory);
}

@end
