/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 file when possible.

#ifndef FIREBASE_FIRESTORE_SRC_COMMON_MAKE_UNIQUE_H_
#define FIREBASE_FIRESTORE_SRC_COMMON_MAKE_UNIQUE_H_

#include <memory>
#include <utility>

namespace firebase {
namespace firestore {

template <typename T, typename... Args>
std::unique_ptr<T> make_unique(Args&&... args) {
  return std::unique_ptr<T>(new T(std::forward<Args>(args)...));
}

}  // namespace firestore
}  // namespace firebase

#endif  // FIREBASE_FIRESTORE_SRC_COMMON_MAKE_UNIQUE_H_
