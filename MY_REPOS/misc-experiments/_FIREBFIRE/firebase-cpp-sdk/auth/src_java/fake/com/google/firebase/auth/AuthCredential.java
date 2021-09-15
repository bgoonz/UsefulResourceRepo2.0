/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

/** Fake AuthCredential */
public final class AuthCredential {
  private String provider;

  /** C++ code does not rely on any constructor. This is solely for fake to specify provider and
   *  does not map to a constructor in the real AuthCredential. */
  AuthCredential(String provider) {
    this.provider = provider;
  }

  public String getSignInMethod() {
    return this.provider;
  }
}
