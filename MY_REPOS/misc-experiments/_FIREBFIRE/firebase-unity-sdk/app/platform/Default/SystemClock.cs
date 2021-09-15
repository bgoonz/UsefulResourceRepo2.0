/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

using System;
using System.Collections.Specialized;
using System.IO;

#endregion

namespace Firebase.Platform.Default {

  /// <summary>A default clock implementation that wraps the <see cref="System.DateTime.Now" /> property.</summary>
  internal class SystemClock : IClockService {
    /// <summary>The default instance.</summary>
    public static readonly IClockService Instance = new SystemClock();

    /// <summary>Constructs a new system clock.</summary>
    protected SystemClock() {
    }

    public DateTime Now {
      get { return DateTime.Now; }
    }

    public DateTime UtcNow {
      get { return DateTime.UtcNow; }
    }
  }
}
