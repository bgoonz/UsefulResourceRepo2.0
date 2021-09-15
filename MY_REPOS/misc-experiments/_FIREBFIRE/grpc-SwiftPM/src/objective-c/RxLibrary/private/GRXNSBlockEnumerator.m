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


@implementation GRXNSBlockEnumerator {
  id (^_block)(void);
}

- (instancetype)init {
  return [self initWithValueSupplier:nil];
}

- (instancetype)initWithValueSupplier:(id (^)(void))block {
  if ((self = [super init])) {
    _block = block;
  }
  return self;
}

- (id)nextObject {
  if (!_block) {
    return nil;
  }
  id value = _block();
  if (!value) {
    _block = nil;
  }
  return value;
}
@end
