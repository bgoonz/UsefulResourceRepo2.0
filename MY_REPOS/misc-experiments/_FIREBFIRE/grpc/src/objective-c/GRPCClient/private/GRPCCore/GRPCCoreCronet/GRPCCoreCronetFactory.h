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


/**
 * The factory for gRPC Core + Cronet transport implementation. The
 * implementation is not part of the default transports of gRPC and is for
 * testing purpose only on Github.
 *
 * To use this transport, a user must include the GRPCCoreCronet module as a
 * dependency of the project and use gGRPCCoreCronetID in call options to
 * specify that this is the transport to be used for a call.
 */
@interface GRPCCoreCronetFactory : NSObject <GRPCCoreTransportFactory>

@end
