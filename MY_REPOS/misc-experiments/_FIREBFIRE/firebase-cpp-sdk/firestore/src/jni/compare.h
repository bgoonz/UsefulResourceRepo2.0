/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
rapper.h"
#include "firestore/src/jni/env.h"
#include "firestore/src/jni/object.h"

namespace firebase {
namespace firestore {
namespace jni {

/**
 * Returns the result of `Object::Equals` for the given `lhs` and `rhs` in the
 * current Firestore `jni::Env`.
 */
template <typename T>
bool EqualityCompareJni(const T& lhs, const T& rhs) {
  Env env;
  env.SetUnhandledExceptionHandler(GlobalUnhandledExceptionHandler, nullptr);
  return Object::Equals(env, lhs.ToJava(), rhs.ToJava());
}

}  // namespace jni
}  // namespace firestore
}  // namespace firebase
