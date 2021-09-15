/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
IN_CREATE_CREDENTIALS_PROVIDER_H_

#include <memory>

#include "Firestore/core/src/auth/credentials_provider.h"

#if defined(__ANDROID__)
#error "This header should not be used on Android."
#endif

namespace firebase {

class App;

namespace firestore {

std::unique_ptr<auth::CredentialsProvider> CreateCredentialsProvider(App& app);

}  // namespace firestore
}  // namespace firebase

#endif  // FIREBASE_FIRESTORE_SRC_MAIN_CREATE_CREDENTIALS_PROVIDER_H_
