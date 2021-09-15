/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

using System.Threading;
using UnityEngine;
using System.Collections.Generic;
using System;
using System.Collections;

namespace Firebase.Unity {
  internal class UnityPlatformServices {
    // This takes about 150 ms. on a Pixel, most of which is the first
    // access to Services since it causes the static constructor to be called.
    public static void SetupServices() {
      Services.AppConfig = UnityConfigExtensions.DefaultInstance;
      Services.Logging = UnityLoggingService.Instance;
    }
  }
}
