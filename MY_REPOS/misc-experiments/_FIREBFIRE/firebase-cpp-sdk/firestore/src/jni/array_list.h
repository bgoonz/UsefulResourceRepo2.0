/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
I_ARRAY_LIST_H_

#include "firestore/src/jni/list.h"

namespace firebase {
namespace firestore {
namespace jni {

/** A C++ proxy for a Java `ArrayList`. */
class ArrayList : public List {
 public:
  using List::List;

  static void Initialize(Loader& loader);

  static Local<ArrayList> Create(Env& env);
  static Local<ArrayList> Create(Env& env, size_t size);
};

}  // namespace jni
}  // namespace firestore
}  // namespace firebase

#endif  // FIREBASE_FIRESTORE_SRC_JNI_ARRAY_LIST_H_
