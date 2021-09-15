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


#import "GRXImmediateWriter.h"

/**
 * Utility to construct GRXWriter instances from values that are immediately available when
 * required.
 *
 * Thread safety: the methods of this class are thread safe.
 */
@interface GRXImmediateSingleWriter : GRXImmediateWriter

/**
 * Returns a writer that sends the passed value to its writeable and then finishes (releasing the
 * value).
 */
+ (GRXWriter *)writerWithValue:(id)value;

@end
