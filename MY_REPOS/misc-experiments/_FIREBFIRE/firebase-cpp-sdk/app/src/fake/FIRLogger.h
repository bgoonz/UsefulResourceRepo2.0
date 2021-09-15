/*
 * Copyright 2019 Google
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

#import "FIRLoggerLevel.h"

#ifdef __cplusplus
extern "C" {
#endif  // __cplusplus

/**
 * Changes the default logging level of FIRLoggerLevelNotice to a user-specified level.
 * The default level cannot be set above FIRLoggerLevelNotice if the app is running from App Store.
 * (required) log level (one of the FIRLoggerLevel enum values).
 */
void FIRSetLoggerLevel(FIRLoggerLevel loggerLevel);

#ifdef __cplusplus
}
#endif  // __cplusplus
