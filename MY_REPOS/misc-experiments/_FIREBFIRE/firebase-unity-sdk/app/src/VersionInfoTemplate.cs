/*
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

/// @brief Build and runtime environment information.
internal class VersionInfo {

  /// @brief Retrieves the Firebase Unity SDK version number as a string.
  // "@FIREBASE_UNITY_SDK_VERSION@" is replaced at build time.
  internal static string SdkVersion { get { return "@FIREBASE_UNITY_SDK_VERSION@"; } }

  /// @brief Retrieves a string indicating whether the SDK was built on github.
  internal static string BuildSource {
    get {
#if FIREBASE_GITHUB_ACTION_BUILD
      return "github_action_built";
#else
      return "custom_built";
#endif
    }
  }
}

}  // namespace Firebase
