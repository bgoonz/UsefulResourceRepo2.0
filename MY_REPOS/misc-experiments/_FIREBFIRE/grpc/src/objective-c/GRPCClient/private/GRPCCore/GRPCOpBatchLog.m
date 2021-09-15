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


#import "GRPCOpBatchLog.h"

static NSMutableArray *opBatchLog = nil;

@implementation GRPCOpBatchLog

+ (void)enableOpBatchLog:(BOOL)enabled {
  @synchronized(opBatchLog) {
    if (enabled) {
      if (!opBatchLog) {
        opBatchLog = [NSMutableArray array];
      }
    } else {
      if (opBatchLog) {
        opBatchLog = nil;
      }
    }
  }
}

+ (void)addOpBatchToLog:(NSArray *)batch {
  @synchronized(opBatchLog) {
    [opBatchLog addObject:batch];
  }
}

+ (NSArray *)obtainAndCleanOpBatchLog {
  @synchronized(opBatchLog) {
    NSArray *out = opBatchLog;
    opBatchLog = [NSMutableArray array];
    return out;
  }
}

@end

#endif
