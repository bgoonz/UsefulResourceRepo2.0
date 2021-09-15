/*
 * Copyright 2016 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

  /// @brief Settings for FirebaseRemoteConfig operations.
  public struct ConfigSettings {
    /// The timeout specifies how long the client should wait for a connection to
    /// the Firebase Remote Config servers.
    ///
    /// @note A fetch call will fail if it takes longer than the specified timeout
    /// to connect to the Remote Config servers. Default is 60 seconds.
    public ulong FetchTimeoutInMilliseconds { get; set; }

    /// The minimum interval between successive fetch calls.
    ///
    /// @note Fetches less than duration seconds after the last fetch from the
    /// Firebase Remote Config server would use values returned during the last
    /// fetch. Default is 12 hours.
    public ulong MinimumFetchInternalInMilliseconds { get; set; }

    internal static ConfigSettings FromInternal(ConfigSettingsInternal csInternal) {
      return new ConfigSettings {
        FetchTimeoutInMilliseconds = csInternal.fetch_timeout_in_milliseconds,
        MinimumFetchInternalInMilliseconds = csInternal.minimum_fetch_interval_in_milliseconds
      };
    }

    internal static ConfigSettingsInternal ToInternal(ConfigSettings cs) {
      ConfigSettingsInternal csInternal = new ConfigSettingsInternal();
      csInternal.fetch_timeout_in_milliseconds = cs.FetchTimeoutInMilliseconds;
      csInternal.minimum_fetch_interval_in_milliseconds = cs.MinimumFetchInternalInMilliseconds;
      return csInternal;
    }
  }
}
