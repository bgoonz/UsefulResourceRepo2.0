/*
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import com.google.firebase.app.internal.cpp.Log;

/**
 * Logging and safe(r) native method execution for Auth listeners.
 */
public class AuthCommon {
  private static final String TAG = "AuthCpp";

  /**
   * Run a native method handling UnsatisfiedLinkError if the native method was unregistered.
   */
  public static void safeRunNativeMethod(Runnable runnable) {
    try {
      runnable.run();
    } catch (UnsatisfiedLinkError e) {
      Log.e(TAG, String.format("Failed to execute native method, perhaps Auth shut down "
                               + "prematurely? (%s)", e.toString()));
    }
  }
}
