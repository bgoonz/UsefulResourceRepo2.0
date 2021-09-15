/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

#include "app/src/include/firebase/app.h"
#include "Firestore/core/src/remote/firebase_metadata_provider_apple.h"
#include "absl/memory/memory.h"

namespace firebase {
namespace firestore {

using remote::FirebaseMetadataProvider;
using remote::FirebaseMetadataProviderApple;

std::unique_ptr<FirebaseMetadataProvider> CreateFirebaseMetadataProvider(App& app) {
  return absl::make_unique<FirebaseMetadataProviderApple>(app.GetPlatformApp());
}

}  // namespace firestore
}  // namespace firebase
