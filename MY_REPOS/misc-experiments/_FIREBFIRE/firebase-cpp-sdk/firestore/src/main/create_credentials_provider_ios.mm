/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

#import "FirebaseCoreInternal.h"
#import "FIRAuthInterop.h"

#include "app/src/include/firebase/app.h"
#include "absl/memory/memory.h"
#include "Firestore/core/src/auth/firebase_credentials_provider_apple.h"

namespace firebase {
namespace firestore {

using auth::CredentialsProvider;
using auth::FirebaseCredentialsProvider;

std::unique_ptr<CredentialsProvider> CreateCredentialsProvider(App& app) {
  FIRApp* ios_app = app.GetPlatformApp();
  auto ios_auth = FIR_COMPONENT(FIRAuthInterop, ios_app.container);
  return absl::make_unique<FirebaseCredentialsProvider>(ios_app, ios_auth);
}

}  // namespace firestore
}  // namespace firebase
