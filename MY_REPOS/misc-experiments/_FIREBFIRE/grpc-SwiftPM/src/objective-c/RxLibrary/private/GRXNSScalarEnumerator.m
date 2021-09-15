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


@implementation GRXNSScalarEnumerator {
  id _value;
}

- (instancetype)init {
  return [self initWithValue:nil];
}

// Designated initializer.
- (instancetype)initWithValue:(id)value {
  if ((self = [super init])) {
    _value = value;
  }
  return self;
}

- (id)nextObject {
  id value = _value;
  _value = nil;
  return value;
}
@end
