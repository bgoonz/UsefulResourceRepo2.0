/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
I_JNI_H_

#include <jni.h>

namespace firebase {
namespace firestore {
namespace jni {

/**
 * Initializes the global `JavaVM` pointer. Should be called once per process
 * execution.
 */
void Initialize(JavaVM* vm);

/**
 * Returns the `JNIEnv` pointer for the current thread.
 */
JNIEnv* GetEnv();

}  // namespace jni
}  // namespace firestore
}  // namespace firebase

#endif  // FIREBASE_FIRESTORE_SRC_JNI_JNI_H_
