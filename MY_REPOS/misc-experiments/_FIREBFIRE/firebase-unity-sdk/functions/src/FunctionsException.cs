/*
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

using System.Diagnostics;
using System.IO;
using System.Net;

namespace Firebase.Functions {
  /// <summary>
  ///   Represents an Exception resulting from an operation on a
  ///   <see cref="FunctionsReference" />
  /// </summary>
  [Serializable]
  public sealed class FunctionsException : Exception {
    /// <returns>
    /// A code that indicates the type of error that occurred. This value will
    /// be one of the set of constants defined on <see cref="FunctionsException" />.
    /// </returns>
    public FunctionsErrorCode ErrorCode { get; private set; }

    internal FunctionsException(FirebaseException e): base(e.Message) {
      ErrorCode = (FunctionsErrorCode) e.ErrorCode;
    }
  }
}
