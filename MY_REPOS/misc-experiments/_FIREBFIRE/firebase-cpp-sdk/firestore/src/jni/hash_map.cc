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

constexpr char kClass[] = "java/util/HashMap";
Constructor<HashMap> kConstructor("()V");

}  // namespace

void HashMap::Initialize(Loader& loader) {
  loader.LoadFromExistingClass(kClass, util::hash_map::GetClass(),
                               kConstructor);
}

Local<HashMap> HashMap::Create(Env& env) { return env.New(kConstructor); }

}  // namespace jni
}  // namespace firestore
}  // namespace firebase
