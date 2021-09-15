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

#import <Foundation/Foundation.h>

/**
 * Logs the op batches of a client. Used for testing.
 */
@interface GRPCOpBatchLog : NSObject

/**
 * Enables logging of op batches. Memory consumption increases as more ops are logged.
 */
+ (void)enableOpBatchLog:(BOOL)enabled;

/**
 * Add an op batch to log.
 */
+ (void)addOpBatchToLog:(NSArray *)batch;

/**
 * Obtain the logged op batches. Invoking this method will clean the log.
 */
+ (NSArray *)obtainAndCleanOpBatchLog;

@end

#endif
