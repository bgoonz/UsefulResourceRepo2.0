/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

/** Fake TwitterAuthProvider */
public final class TwitterAuthProvider {

  public static AuthCredential getCredential(String token, String secret) {
    return new AuthCredential("twitter.com");
  }
}
