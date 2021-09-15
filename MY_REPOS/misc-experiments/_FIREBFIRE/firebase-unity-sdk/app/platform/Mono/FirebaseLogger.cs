/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

internal class FirebaseLogger {
  // Determine whether it's possible to redirect C++ logs via the C# logger.
  internal static bool CanRedirectNativeLogs { get { return true; } }

  // Log a message via the System Console.
  internal static void LogMessage(PlatformLogLevel logLevel,
                                  string message) {
    PlatformLogLevel currentLevel = FirebaseHandler.AppUtils.GetLogLevel();
    if (logLevel < currentLevel) return;
    System.Diagnostics.Debug.WriteLine(message);
  }
}

}  // namespace Firebase
