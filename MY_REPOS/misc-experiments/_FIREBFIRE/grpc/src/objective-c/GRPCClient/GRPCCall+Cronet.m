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


const GRPCTransportID gGRPCCoreCronetID = "io.grpc.transport.core.cronet";

static BOOL useCronet = NO;
static stream_engine *globalCronetEngine;

@implementation GRPCCall (Cronet)

+ (void)useCronetWithEngine:(stream_engine *)engine {
  useCronet = YES;
  globalCronetEngine = engine;
}

+ (stream_engine *)cronetEngine {
  return globalCronetEngine;
}

+ (BOOL)isUsingCronet {
  return useCronet;
}

@end
