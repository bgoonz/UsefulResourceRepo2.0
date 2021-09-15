/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

  /// A factory for getting ahold of a preference storage mechanism. This will
  /// allow us to manage the specific type of instance and swap out the
  /// implementation at our descretion.
  /// </summary>
  static class StorageProvider {

    public static IFirebaseConfigurationStorage ConfigurationStorage { get; private set; }

    private static readonly string SettingsAssetName = "CrashlyticsSettings";
    private static readonly string SettingsAssetExtension = "asset";
    private static ScriptableSettingsStorage _instance;

    /// <summary>
    /// Initializes the <see cref="T:Firebase.Crashlytics.Editor.src.PreferenceStorageFactory"/> class.
    /// Specifically, create a singleton instance of our ScriptableSettings
    /// </summary>
    static StorageProvider() {
      ScriptableSettingsStorage.AssetContext assetContext = new ScriptableSettingsStorage.AssetContext(
        SettingsAssetName,
        SettingsAssetExtension
      );
      ConfigurationStorage = ScriptableSettingsStorage.CreateOrLoadInstance(assetContext);
    }
  }
}
