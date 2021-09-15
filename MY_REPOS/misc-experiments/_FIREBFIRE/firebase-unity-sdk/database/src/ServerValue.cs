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
  ///   Contains placeholder values to use when writing data to the Firebase Database.
  /// </summary>
  public static class ServerValue {
    private const string NameSubkeyServervalue = ".sv";

    /// <summary>
    ///   A placeholder value for auto-populating the current timestamp (time since the Unix epoch,
    ///   in milliseconds) by the Firebase Database servers.
    /// </summary>
    public static readonly object Timestamp =
      CreateServerValuePlaceholder("timestamp");

    // Server values
    private static IDictionary<string, object> CreateServerValuePlaceholder(string key) {
      // The Firebase server defines a ServerValue for Timestamp as a map with the
      // key ".sv" and the value "timestamp".
      IDictionary<string, object> result = new Dictionary<string, object>();
      result[NameSubkeyServervalue] = key;
      return result;
    }
  }
}
