/*
 *
 * Copyright 2018 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *


#import "../GRPCCallOptions.h"

@interface GRPCCallOptions ()

/**
 * Parameter used for internal logging.
 */
@property(readonly) id logContext;

@end

@interface GRPCMutableCallOptions ()

/**
 * Parameter used for internal logging.
 */
@property(readwrite) id logContext;

@end
