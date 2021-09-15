/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
DROID_BLOB_ANDROID_H_

#include "firestore/src/jni/jni_fwd.h"
#include "firestore/src/jni/object.h"

namespace firebase {
namespace firestore {

class BlobInternal : public jni::Object {
 public:
  using Object::Object;

  static void Initialize(jni::Loader& loader);

  static jni::Class GetClass();

  static jni::Local<BlobInternal> Create(jni::Env& env,
                                         const uint8_t* value,
                                         size_t size);

  jni::Local<jni::Array<uint8_t>> ToBytes(jni::Env& env) const;
};

}  // namespace firestore
}  // namespace firebase

#endif  // FIREBASE_FIRESTORE_SRC_ANDROID_BLOB_ANDROID_H_
