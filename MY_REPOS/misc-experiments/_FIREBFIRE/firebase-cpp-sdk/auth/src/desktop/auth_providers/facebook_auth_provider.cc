/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
roviders/facebook_auth_credential.h"
#include "auth/src/desktop/credential_impl.h"
#include "auth/src/include/firebase/auth/credential.h"

namespace firebase {
namespace auth {

// static
Credential FacebookAuthProvider::GetCredential(const char* const access_token) {
  FIREBASE_ASSERT_RETURN(Credential(), access_token);
  return Credential{
      new CredentialImpl{new FacebookAuthCredential(access_token)}};
}

}  // namespace auth
}  // namespace firebase
