
/*
 *
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *

 * An object that processes its methods with a dispatch queue.
 */
@protocol GRPCDispatchable

/**
 * The dispatch queue where the object's methods should be run on.
 */
@property(atomic, readonly) dispatch_queue_t dispatchQueue;

@end
