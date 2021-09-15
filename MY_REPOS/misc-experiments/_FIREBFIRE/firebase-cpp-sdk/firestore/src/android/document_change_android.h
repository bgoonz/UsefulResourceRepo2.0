/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
DROID_DOCUMENT_CHANGE_ANDROID_H_

#include <cstdint>

#include "firestore/src/android/wrapper.h"
#include "firestore/src/include/firebase/firestore/document_change.h"
#include "firestore/src/jni/jni_fwd.h"

namespace firebase {
namespace firestore {

class DocumentChangeInternal : public Wrapper {
 public:
  using Wrapper::Wrapper;

  static void Initialize(jni::Loader& loader);

  DocumentChange::Type type() const;
  DocumentSnapshot document() const;
  std::size_t old_index() const;
  std::size_t new_index() const;

  std::size_t Hash() const;
};

bool operator==(const DocumentChangeInternal& lhs,
                const DocumentChangeInternal& rhs);

inline bool operator!=(const DocumentChangeInternal& lhs,
                       const DocumentChangeInternal& rhs) {
  return !(lhs == rhs);
}

}  // namespace firestore
}  // namespace firebase

#endif  // FIREBASE_FIRESTORE_SRC_ANDROID_DOCUMENT_CHANGE_ANDROID_H_
