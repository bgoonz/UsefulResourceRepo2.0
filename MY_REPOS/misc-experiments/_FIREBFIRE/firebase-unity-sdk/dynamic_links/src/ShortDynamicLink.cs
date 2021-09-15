/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *


namespace Firebase.DynamicLinks {

/// @brief The returned value from creating a shortened Dynamic Link.
public sealed class ShortDynamicLink {
  /// The short Dynamic Link value.
  public System.Uri Url { get; private set; }
  /// Information about potential warnings on link creation.
  ///
  /// Usually presence of warnings means parameter format errors, parameter
  /// value errors, or missing parameters.
  public IEnumerable<string> Warnings { get; private set; }

  // Convert from GeneratedDynamicLinkInternal to a ShortDynamicLink.
  internal static ShortDynamicLink ConvertFromInternal(
        GeneratedDynamicLinkInternal generatedDynamicLink) {
    if (!String.IsNullOrEmpty(generatedDynamicLink.error)) {
      throw new Firebase.FirebaseException(0, generatedDynamicLink.error);
    }
    return new ShortDynamicLink {
      Url = Firebase.FirebaseApp.UrlStringToUri(generatedDynamicLink.url),
      Warnings = new List<string>(generatedDynamicLink.warnings)
    };
  }
}

}
