/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

#include "app/src/util_android.h"
#include "firestore/src/jni/env.h"
#include "firestore/src/jni/loader.h"

namespace firebase {
namespace firestore {
namespace jni {
namespace {

Constructor<ArrayList> kConstructor("()V");
Constructor<ArrayList> kConstructorWithSize("(I)V");

}  // namespace

void ArrayList::Initialize(Loader& loader) {
  loader.LoadFromExistingClass("java/util/ArrayList",
                               util::array_list::GetClass(), kConstructor,
                               kConstructorWithSize);
}

Local<ArrayList> ArrayList::Create(Env& env) { return env.New(kConstructor); }

Local<ArrayList> ArrayList::Create(Env& env, size_t size) {
  return env.New(kConstructorWithSize, size);
}

}  // namespace jni
}  // namespace firestore
}  // namespace firebase
