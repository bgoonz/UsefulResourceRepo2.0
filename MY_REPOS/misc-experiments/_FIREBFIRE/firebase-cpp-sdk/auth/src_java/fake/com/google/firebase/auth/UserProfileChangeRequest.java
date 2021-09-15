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

/** Fake UserProfileChangeRequest$Builder */
public final class UserProfileChangeRequest {

  /** Builder */
  public static class Builder {
    public Builder setDisplayName(String displayName) {
      return this;
    }

    public Builder setPhotoUri(Uri photoUri) {
      return this;
    }

    public UserProfileChangeRequest build() {
      return new UserProfileChangeRequest();
    }
  }
}
