/*
 * Copyright 2016 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
FIREBASE_LOG_H_

/// @brief Namespace that encompasses all Firebase APIs.
namespace firebase {

/// @brief Levels used when logging messages.
enum LogLevel {
  /// Verbose Log Level
  kLogLevelVerbose = 0,
  /// Debug Log Level
  kLogLevelDebug,
  /// Info Log Level
  kLogLevelInfo,
  /// Warning Log Level
  kLogLevelWarning,
  /// Error Log Level
  kLogLevelError,
  /// Assert Log Level
  kLogLevelAssert,
};

/// @brief Sets the logging verbosity.
/// All log messages at or above the specific log level.
///
/// @param[in] level Log level to display, by default this is set to
/// kLogLevelInfo.
void SetLogLevel(LogLevel level);

/// @brief Gets the logging verbosity.
///
/// @return Get the currently configured logging verbosity.
LogLevel GetLogLevel();

// NOLINTNEXTLINE - allow namespace overridden
}  // namespace firebase

#endif  // FIREBASE_APP_SRC_INCLUDE_FIREBASE_LOG_H_
