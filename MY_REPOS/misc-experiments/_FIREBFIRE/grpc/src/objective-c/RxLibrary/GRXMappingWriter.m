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


@interface GRXForwardingWriter () <GRXWriteable>
@end

@implementation GRXMappingWriter {
  id (^_map)(id value);
}

- (instancetype)initWithWriter:(GRXWriter *)writer {
  return [self initWithWriter:writer map:nil];
}

// Designated initializer
- (instancetype)initWithWriter:(GRXWriter *)writer map:(id (^)(id value))map {
  if ((self = [super initWithWriter:writer])) {
    _map = map ?: ^id(id value) {
      return value;
    };
  }
  return self;
}

// Override
- (void)writeValue:(id)value {
  [super writeValue:_map(value)];
}
@end
