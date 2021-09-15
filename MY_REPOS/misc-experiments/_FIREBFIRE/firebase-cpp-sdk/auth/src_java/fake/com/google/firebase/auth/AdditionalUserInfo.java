/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import java.util.Map;

/** Fake AdditionalUserInfo */
public final class AdditionalUserInfo {

  public String getProviderId() {
    return "fake provider id";
  }

  public Map<String, Object> getProfile() {
    return null;
  }

  public String getUsername() {
    return "fake user name";
  }
}
