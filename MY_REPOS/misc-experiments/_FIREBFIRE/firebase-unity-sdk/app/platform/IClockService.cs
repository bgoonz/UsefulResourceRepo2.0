/*
 * Copyright 2016 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

namespace Firebase.Platform {
  /// <summary>Clock wrapper for getting the current time.</summary>
  internal interface IClockService {
    /// <summary>
    ///   Gets a <see cref="System.DateTime" /> object that is set to the current date and time on this computer,
    ///   expressed as the local time.
    /// </summary>
    DateTime Now { get; }

    /// <summary>
    ///   Gets a <see cref="System.DateTime" /> object that is set to the current date and time on this computer,
    ///   expressed as UTC time.
    /// </summary>
    DateTime UtcNow { get; }
  }
}
