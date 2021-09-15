/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
DROID_SOURCE_ANDROID_H_

#include "firestore/src/include/firebase/firestore/source.h"
#include "firestore/src/jni/jni_fwd.h"

namespace firebase {
namespace firestore {

class SourceInternal {
 public:
  static void Initialize(jni::Loader& loader);

  static jni::Local<jni::Object> Create(jni::Env& env, Source source);
};

}  // namespace firestore
}  // namespace firebase

#endif  // FIREBASE_FIRESTORE_SRC_ANDROID_SOURCE_ANDROID_H_
