/*
 * Copyright 2016 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import android.app.Activity;

/** Runs a native C++ function on an alternate thread. */
public class CppThreadDispatcher {
  /** Runs a C++ function on the main thread, using Activity.runOnUiThread. */
  public static void runOnMainThread(Activity activity, final CppThreadDispatcherContext context) {
    activity.runOnUiThread(new Runnable() {
      @Override
      public void run() {
        context.execute();
      }
    });
  }

  /** Runs a C++ function on a new Java background thread. */
  public static void runOnBackgroundThread(final CppThreadDispatcherContext context) {
    Thread t = new Thread(new Runnable() {
      @Override
      public void run() {
        context.execute();
      }
    });
    t.start();
  }
}
