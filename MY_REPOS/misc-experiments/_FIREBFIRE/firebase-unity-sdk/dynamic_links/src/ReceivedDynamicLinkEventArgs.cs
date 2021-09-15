/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

/// @brief Passed to the DynamicLinks.DynamicLinkReceived event.
///
/// The dynamic link received by the application is passed via these arguments to the
/// Firebase.DynamicLinks.DynamicLinks.DynamicLinkReceived event.
public sealed class ReceivedDynamicLinkEventArgs : System.EventArgs {
  /// Dynamic link received by the application.
  public ReceivedDynamicLink ReceivedDynamicLink { get; internal set; }
}

}
