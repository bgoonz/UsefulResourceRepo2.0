/*
 * Copyright 2017 Google
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *


/**
 * The log levels used by internal logging.
 */
typedef NS_ENUM(NSInteger, FIRLoggerLevel) {
  /** Error level, matches ASL_LEVEL_ERR. */
  FIRLoggerLevelError = 3,
  /** Warning level, matches ASL_LEVEL_WARNING. */
  FIRLoggerLevelWarning = 4,
  /** Notice level, matches ASL_LEVEL_NOTICE. */
  FIRLoggerLevelNotice = 5,
  /** Info level, matches ASL_LEVEL_INFO. */
  FIRLoggerLevelInfo = 6,
  /** Debug level, matches ASL_LEVEL_DEBUG. */
  FIRLoggerLevelDebug = 7,
  /** Minimum log level. */
  FIRLoggerLevelMin = FIRLoggerLevelError,
  /** Maximum log level. */
  FIRLoggerLevelMax = FIRLoggerLevelDebug
} NS_SWIFT_NAME(FirebaseLoggerLevel);
