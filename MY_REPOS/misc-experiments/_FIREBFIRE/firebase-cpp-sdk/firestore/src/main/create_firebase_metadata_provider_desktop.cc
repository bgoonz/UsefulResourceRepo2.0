/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
te_firebase_metadata_provider.h"
#include "firestore/src/main/firebase_metadata_provider_desktop.h"

namespace firebase {
namespace firestore {

using remote::FirebaseMetadataProvider;

std::unique_ptr<FirebaseMetadataProvider> CreateFirebaseMetadataProvider(App&) {
  return absl::make_unique<FirebaseMetadataProviderCpp>();
}

}  // namespace firestore
}  // namespace firebase
