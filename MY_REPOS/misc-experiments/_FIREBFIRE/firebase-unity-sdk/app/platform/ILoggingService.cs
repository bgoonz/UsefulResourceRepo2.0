/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

namespace Firebase.Platform {
  internal interface ILoggingService {
    void LogMessage(PlatformLogLevel level, string message);
  }

  class DebugLogger : ILoggingService {
    private static DebugLogger _instance = new DebugLogger();
    public static DebugLogger Instance { get { return _instance; } }

    public void LogMessage(PlatformLogLevel level, string message) {
      System.Diagnostics.Debug.WriteLine(message);
    }
  }
}
