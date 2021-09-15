/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import com.google.firebase.FirebaseException;

/** Fake FirebaseAuthException */
public class FirebaseAuthException extends FirebaseException {

  public FirebaseAuthException(String code, String message) {
    super(message);
    code_ = code;
  }

  public String getErrorCode() {
    return code_;
  }

  private String code_;
}
