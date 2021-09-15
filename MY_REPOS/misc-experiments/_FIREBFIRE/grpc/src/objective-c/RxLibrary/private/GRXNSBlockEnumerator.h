/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *


/**
 * Concrete subclass of NSEnumerator that delegates the invocations of nextObject to a block passed
 * on initialization.
 */
@interface GRXNSBlockEnumerator : NSEnumerator
/**
 * The first time the passed block returns nil, the enumeration will end and the block will be
 * released.
 */
- (instancetype)initWithValueSupplier:(id (^)(void))block;
@end
