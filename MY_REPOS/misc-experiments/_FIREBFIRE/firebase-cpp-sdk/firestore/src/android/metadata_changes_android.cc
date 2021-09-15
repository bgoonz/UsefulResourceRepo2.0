/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

#include "firestore/src/jni/env.h"
#include "firestore/src/jni/loader.h"

namespace firebase {
namespace firestore {
namespace {

using jni::Env;
using jni::Local;
using jni::Object;
using jni::StaticField;

constexpr char kClass[] =
    PROGUARD_KEEP_CLASS "com/google/firebase/firestore/MetadataChanges";
StaticField<Object> kExclude("EXCLUDE",
                             "Lcom/google/firebase/firestore/MetadataChanges;");
StaticField<Object> kInclude("INCLUDE",
                             "Lcom/google/firebase/firestore/MetadataChanges;");

}  // namespace

void MetadataChangesInternal::Initialize(jni::Loader& loader) {
  loader.LoadClass(kClass, kExclude, kInclude);
}

Local<Object> MetadataChangesInternal::Create(
    Env& env, MetadataChanges metadata_changes) {
  switch (metadata_changes) {
    case MetadataChanges::kExclude:
      return env.Get(kExclude);
    case MetadataChanges::kInclude:
      return env.Get(kInclude);
  }
}

}  // namespace firestore
}  // namespace firebase
