/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

/// @brief Additional options for Dynamic Link creation.
public class DynamicLinkOptions {
  /// The desired path length for shortened Dynamic Link URLs.
  public DynamicLinkPathLength PathLength { get; set; }

  // Convert to DynamicLinkOptionsInternal.
  internal DynamicLinkOptionsInternal ConvertToInternal() {
    return new DynamicLinkOptionsInternal {
      path_length = PathLength.ConvertToInternal()
    };
  }
}

}
