/*
 * Copyright 2016 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

namespace Firebase.Database {
  /// <summary>
  ///   This error is thrown when the Firebase Database library is unable to operate on the input it
  ///   has been given.
  /// </summary>
  [Serializable]
  public sealed class DatabaseException : Exception {
    /// <summary>
    ///   <strong>For internal use</strong>
    /// </summary>
    /// <hide />
    /// <param name="message">A human readable description of the error</param>
    internal DatabaseException(string message) : base(message) {
    }

    /// <summary>
    ///   <strong>For internal use</strong>
    /// </summary>
    /// <hide />
    /// <param name="message">A human readable description of the error</param>
    /// <param name="cause">The underlying cause for this error</param>
    internal DatabaseException(string message, Exception cause) : base(message, cause) {
    }
  }
}
