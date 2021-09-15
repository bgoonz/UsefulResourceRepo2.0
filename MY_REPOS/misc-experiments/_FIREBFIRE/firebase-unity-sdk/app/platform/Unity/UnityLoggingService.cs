/*
 * Copyright 2016 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

using UnityEngine;
using Firebase.Platform;

namespace Firebase.Unity {
  internal class UnityLoggingService : ILoggingService {

    private static UnityLoggingService _instance = new UnityLoggingService();
    public static UnityLoggingService Instance { get { return _instance; } }

    public void LogMessage(PlatformLogLevel level, string message) {
       FirebaseLogger.LogMessage(
            level,
            message);
    }
  }
}
