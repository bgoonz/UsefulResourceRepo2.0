/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *


namespace Firebase.Platform {

  // Implementation of the Platform interface that provides a way to manage
  // FirebaseApps without directly using FirebaseApp, to resolve dependency
  // problems.
  internal class FirebaseAppPlatform : IFirebaseAppPlatform {
    private WeakReference app { get; set; }

    internal FirebaseAppPlatform(FirebaseApp wrappedApp) {
      app = new WeakReference(wrappedApp, false);
    }

    // The wrapped FirebaseApp object. Note that it is returned as an
    // object because the interface is from the Platform dll, which cannot
    // reference FirebaseApp.
    public object AppObject {
      get {
        try {
          return app.Target;
        } catch (InvalidOperationException) {
          // Target will throw if the object is finalized while using the accessor.
          return null;
        }
      }
    }

    // The wrapped FirebaseApp object, as a FirebaseApp.
    internal FirebaseApp App {
      get { return AppObject as FirebaseApp; }
    }

    // The name field from the wrapped FirebaseApp object.
    public string Name {
      get {
        FirebaseApp app = App;
        if (app != null) {
          return app.Name;
        } else {
          return null;
        }
      }
    }

    // The database url from the wrapped FirebaseApp object.
    public Uri DatabaseUrl {
      get {
        FirebaseApp app = App;
        if (app != null) {
          return app.Options.DatabaseUrl;
        } else {
          return null;
        }
      }
    }
  }
}
