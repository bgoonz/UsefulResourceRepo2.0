/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
roviders/oauth_auth_credential.h"
#include "auth/src/desktop/credential_impl.h"
#include "auth/src/include/firebase/auth/credential.h"

namespace firebase {
namespace auth {

// static
Credential OAuthProvider::GetCredential(const char* const provider_id,
                                        const char* const id_token,
                                        const char* const access_token) {
  FIREBASE_ASSERT_RETURN(Credential(), provider_id && id_token && access_token);
  return Credential{new CredentialImpl{new OAuthCredential{
      provider_id, id_token, /*raw_nonce=*/"", access_token}}};
}

// static
Credential OAuthProvider::GetCredential(const char* provider_id,
                                        const char* id_token,
                                        const char* raw_nonce,
                                        const char* access_token) {
  FIREBASE_ASSERT_RETURN(Credential(), provider_id && id_token && raw_nonce);
  if (access_token == nullptr) {
    access_token = "";
  }
  return Credential{new CredentialImpl{
      new OAuthCredential{provider_id, id_token, raw_nonce, access_token}}};
}

}  // namespace auth
}  // namespace firebase
