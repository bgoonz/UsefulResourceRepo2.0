/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

  /// <summary>
  /// Provider that is responsible for getting dummy application identifier
  /// for tests
  /// </summary>
  public class MockApplicationIdentifierProvider: IApplicationIdentifierProvider {

    /// <summary>
    /// Returns the IOS application identifier for the Unity app
    /// </summary>
    public string AppIDForIOS
    {
      get
      {
        return "MockApplicationIdentifierProvider.AppIDForIOS";
      }
    }

    /// <summary>
    /// Returns the Android application identifier for the Unity app
    /// </summary>
    public string AppIDForAndroid
    {
      get
      {
        return "MockApplicationIdentifierProvider.AppIDForAndroid";
      }
    }
  }
}
