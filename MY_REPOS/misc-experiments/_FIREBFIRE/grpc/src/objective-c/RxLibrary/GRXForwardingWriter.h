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
 * A "proxy" class that simply forwards values, completion, and errors from its input writer to its
 * writeable.
 * It is useful as a superclass for pipes that act as a transformation of their
 * input writer, and for classes that represent objects with input and
 * output sequences of values, like an RPC.
 *
 * Thread-safety: the methods of this class are thread safe.
 */
@interface GRXForwardingWriter : GRXWriter
- (instancetype)initWithWriter:(GRXWriter *)writer NS_DESIGNATED_INITIALIZER;
@end
