/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

/** Fake FirebaseAuthWeakPasswordException */
public class FirebaseAuthWeakPasswordException extends FirebaseAuthInvalidCredentialsException {

  public FirebaseAuthWeakPasswordException(String code, String message) {
    super(code, message);
  }

  public String getReason() {
    return "fake bad password reason.";
  }
}
