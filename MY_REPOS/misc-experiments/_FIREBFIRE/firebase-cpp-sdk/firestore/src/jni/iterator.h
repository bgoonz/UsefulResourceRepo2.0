/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
I_ITERATOR_H_

#include "firestore/src/jni/jni_fwd.h"
#include "firestore/src/jni/object.h"

namespace firebase {
namespace firestore {
namespace jni {

/** A C++ proxy for a Java `Iterator`. */
class Iterator : public Object {
 public:
  using Object::Object;

  static void Initialize(Loader& loader);

  bool HasNext(Env& env) const;
  Local<Object> Next(Env& env);
};

}  // namespace jni
}  // namespace firestore
}  // namespace firebase

#endif  // FIREBASE_FIRESTORE_SRC_JNI_ITERATOR_H_
