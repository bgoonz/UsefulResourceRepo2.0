/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import android.content.Context;
import com.google.firebase.testing.cppsdk.ConfigAndroid;
import com.google.firebase.testing.cppsdk.ConfigRow;

/** Fake gms/common/GoogleApiAvailability.java for unit testing. */
public final class GoogleApiAvailability {

  private static final GoogleApiAvailability INSTANCE = new GoogleApiAvailability();

  public static GoogleApiAvailability getInstance() {
    ConfigRow row = ConfigAndroid.get("GoogleApiAvailability.getInstance");
    if (row != null) {
      // Right now we let it returns null and ignore whatever set.
      return null;
    }

    // Default behavior
    return INSTANCE;
  }

  public int isGooglePlayServicesAvailable(Context context) {
    ConfigRow row = ConfigAndroid.get("GoogleApiAvailability.isGooglePlayServicesAvailable");
    if (row != null) {
      return row.futureint().value();
    }

    // Default behavior
    return 0;
  }
}
