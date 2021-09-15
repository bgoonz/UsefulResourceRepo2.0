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


@interface NSEnumerator (GRXUtil)

/**
 * Returns a NSEnumerator instance that iterates through the elements of the passed container that
 * supports fast enumeration. Note that this negates the speed benefits of fast enumeration over
 * NSEnumerator. It's only intended for the rare cases when one needs the latter and only has the
 * former, e.g. for iteration that needs to be paused and resumed later.
 */
+ (NSEnumerator *)grx_enumeratorWithContainer:(id<NSFastEnumeration>)container;

/**
 * Returns a NSEnumerator instance that provides a single object before finishing. The value is then
 * released.
 */
+ (NSEnumerator *)grx_enumeratorWithSingleValue:(id)value;

/**
 * Returns a NSEnumerator instance that delegates the invocations of nextObject to the passed block.
 * When the block first returns nil, it is released.
 */
+ (NSEnumerator *)grx_enumeratorWithValueSupplier:(id (^)(void))block;
@end
