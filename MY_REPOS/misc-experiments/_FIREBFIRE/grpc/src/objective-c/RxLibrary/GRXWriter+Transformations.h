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


@interface GRXWriter (Transformations)

/**
 * Returns a writer that wraps the receiver, and has all the values the receiver would write
 * transformed by the provided mapping function.
 */
- (GRXWriter *)map:(id (^)(id value))map;

@end
