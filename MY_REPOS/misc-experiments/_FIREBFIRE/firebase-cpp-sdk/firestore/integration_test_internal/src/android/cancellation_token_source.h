/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
ATION_TEST_INTERNAL_SRC_ANDROID_CANCELLATION_TOKEN_SOURCE_H_

#include "firestore/src/jni/jni_fwd.h"
#include "firestore/src/jni/object.h"

namespace firebase {
namespace firestore {

/** A C++ proxy for a Java `CancellationTokenSource` from the Tasks API. */
class CancellationTokenSource : public jni::Object {
 public:
  using jni::Object::Object;

  static void Initialize(jni::Loader& loader);

  /** Creates a C++ proxy for a Java `CancellationTokenSource` object. */
  static jni::Local<CancellationTokenSource> Create(jni::Env& env);

  /**
   * Invokes `getToken()` on the wrapped Java `CancellationTokenSource` object.
   */
  jni::Local<Object> GetToken(jni::Env& env);

  /**
   * Invokes `cancel()` on the wrapped Java `CancellationTokenSource` object.
   */
  void Cancel(jni::Env& env);
};

}  // namespace firestore
}  // namespace firebase

#endif  // FIREBASE_FIRESTORE_INTEGRATION_TEST_INTERNAL_SRC_ANDROID_CANCELLATION_TOKEN_SOURCE_H_
