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
s.h"

#import "GRXMappingWriter.h"

@implementation GRXWriter (Transformations)

- (GRXWriter *)map:(id (^)(id))map {
  if (!map) {
    return self;
  }
  return [[GRXMappingWriter alloc] initWithWriter:self map:map];
}

@end
