/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
se/auth.h"
#include "firestore/src/main/create_credentials_provider.h"
#include "firestore/src/main/credentials_provider_desktop.h"

namespace firebase {
namespace firestore {

using auth::CredentialsProvider;
using firebase::auth::Auth;

std::unique_ptr<CredentialsProvider> CreateCredentialsProvider(App& app) {
  return absl::make_unique<FirebaseCppCredentialsProvider>(app);
}

}  // namespace firestore
}  // namespace firebase
