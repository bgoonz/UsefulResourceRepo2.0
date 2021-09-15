/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

  using UnityEngine;

  /// <summary>
  /// Automatically collects metadata and serializes to JSON in a space-efficient way.
  /// </summary>
  internal class MetadataBuilder {
    public static string METADATA_KEY = "com.crashlytics.metadata.unity";

    public static string GenerateMetadataJSON() {
      try {
        Metadata metadata = new Metadata();
        return JsonUtility.ToJson(metadata);
      } catch (Exception e) {
        UnityEngine.Debug.LogError(
            "Failed to generate Unity-specific metadata for Crashlytics due to: " + e.ToString());
        return "";
      }
    }
  }
}
