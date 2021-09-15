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


#import "GRXImmediateSingleWriter.h"
#import "GRXImmediateWriter.h"

@implementation GRXWriter (Immediate)

+ (instancetype)writerWithEnumerator:(NSEnumerator *)enumerator {
  return [GRXImmediateWriter writerWithEnumerator:enumerator];
}

+ (instancetype)writerWithValueSupplier:(id (^)(void))block {
  return [GRXImmediateWriter writerWithValueSupplier:block];
}

+ (instancetype)writerWithContainer:(id<NSFastEnumeration>)container {
  return [GRXImmediateWriter writerWithContainer:container];
}

+ (instancetype)writerWithValue:(id)value {
  return [GRXImmediateSingleWriter writerWithValue:value];
}

+ (instancetype)writerWithError:(NSError *)error {
  return [GRXImmediateWriter writerWithError:error];
}

+ (instancetype)emptyWriter {
  return [GRXImmediateWriter emptyWriter];
}

@end
