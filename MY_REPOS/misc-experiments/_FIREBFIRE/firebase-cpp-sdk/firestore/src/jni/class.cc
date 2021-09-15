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

constexpr char kClass[] = "java/lang/Class";
Method<String> kGetName("getName", "()Ljava/lang/String;");
Method<bool> kIsArray("isArray", "()Z");

}  // namespace

void Class::Initialize(Loader& loader) {
  loader.LoadFromExistingClass(kClass, util::class_class::GetClass(), kGetName,
                               kIsArray);
}

std::string Class::GetName(Env& env) const {
  return env.Call(*this, kGetName).ToString(env);
}

std::string Class::GetClassName(Env& env, const Object& object) {
  return util::JObjectClassName(env.get(), object.get());
}

bool Class::IsArray(Env& env) const { return env.Call(*this, kIsArray); }

}  // namespace jni
}  // namespace firestore
}  // namespace firebase
