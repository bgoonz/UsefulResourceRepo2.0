/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import android.net.Uri;

/** Fake UserInfo */
public class UserInfo {
  protected String email = "fake email";

  String getUid() {
    return "fake uid";
  }

  String getProviderId() {
    return "fake provider id";
  }

  String getDisplayName() {
    return "fake display name";
  }

  String getPhoneNumber() {
    return "fake phone number";
  }

  Uri getPhotoUrl() {
    return null;
  }

  String getEmail() {
    return email;
  }

  boolean isEmailVerified() {
    // This is false to match the desktop stub.
    return false;
  }
}
