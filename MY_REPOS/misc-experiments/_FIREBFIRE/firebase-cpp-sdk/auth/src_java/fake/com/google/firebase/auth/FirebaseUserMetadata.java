/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

/** Holds the user metadata for the current {@link FirebaseUser} */
public class FirebaseUserMetadata {

  /** Fake timestamp returned that's non-zero. */
  public long getLastSignInTimestamp() {
    return 1;
  }

  /** Fake timestamp returned that's non-zero. */
  public long getCreationTimestamp() {
    return 1;
  }
}
