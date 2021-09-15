/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *


namespace Firebase.Crashlytics.Editor {

  /// <summary>
  /// Provider that is responsible for getting the application identifier
  /// for the various platforms
  /// </summary>
  public class ApplicationIdentifierProvider: IApplicationIdentifierProvider {

    /// <summary>
    /// Returns the IOS application identifier for the Unity app
    /// </summary>
    public string AppIDForIOS
    {
      get
      {
        return UnityCompat.GetApplicationId(BuildTarget.iOS);
      }
    }

    /// <summary>
    /// Returns the Android application identifier for the Unity app
    /// </summary>
    public string AppIDForAndroid
    {
      get
      {
        return UnityCompat.GetApplicationId(BuildTarget.Android);
      }
    }
  }
}
