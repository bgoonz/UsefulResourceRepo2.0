/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
DROID_LOAD_BUNDLE_TASK_ANDROID_H_

#include "firestore/src/android/wrapper.h"
#include "firestore/src/jni/env.h"
#include "firestore/src/jni/loader.h"
#include "firestore/src/jni/task.h"

namespace firebase {
namespace firestore {

/** A C++ proxy for a Java `LoadBundleTask`, which is a subclass of `Task`. */
class LoadBundleTaskInternal : public jni::Task {
 public:
  using Task::Task;

  static void Initialize(jni::Loader& loader);

  void AddProgressListener(jni::Env& env,
                           const jni::Object& executor,
                           const jni::Object& listener);
};

}  // namespace firestore
}  // namespace firebase

#endif  // FIREBASE_FIRESTORE_SRC_ANDROID_LOAD_BUNDLE_TASK_ANDROID_H_
