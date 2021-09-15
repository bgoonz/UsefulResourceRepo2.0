/*
 *
 * Copyright 2017 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *


#import "GRPCCall+InternalTests.h"

#import "../private/GRPCCore/GRPCOpBatchLog.h"

@implementation GRPCCall (InternalTests)

+ (void)enableOpBatchLog:(BOOL)enabled {
  [GRPCOpBatchLog enableOpBatchLog:enabled];
}

+ (NSArray *)obtainAndCleanOpBatchLog {
  return [GRPCOpBatchLog obtainAndCleanOpBatchLog];
}

@end

#endif
