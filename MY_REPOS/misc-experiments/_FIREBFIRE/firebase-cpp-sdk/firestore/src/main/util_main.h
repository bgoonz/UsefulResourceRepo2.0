/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
IN_UTIL_MAIN_H_

#include "Firestore/core/src/api/firestore.h"
#include "firestore/src/include/firebase/firestore.h"
#include "firestore/src/main/firestore_main.h"

#if defined(__ANDROID__)
#error "This header should not be used on Android."
#endif

namespace firebase {
namespace firestore {

template <typename T>
FirestoreInternal* GetFirestoreInternal(T* object) {
  void* raw_ptr = object->firestore()->extension();
  return static_cast<FirestoreInternal*>(raw_ptr);
}

template <typename T>
Firestore* GetFirestore(T* object) {
  return GetFirestoreInternal(object)->firestore_public();
}

}  // namespace firestore
}  // namespace firebase

#endif  // FIREBASE_FIRESTORE_SRC_MAIN_UTIL_MAIN_H_
