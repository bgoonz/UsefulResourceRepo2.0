/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
roviders/google_auth_credential.h"
#include "auth/src/desktop/credential_impl.h"
#include "auth/src/include/firebase/auth/credential.h"

namespace firebase {
namespace auth {

// static
Credential GoogleAuthProvider::GetCredential(const char* const id_token,
                                             const char* const access_token) {
  if (id_token && id_token[0] != '\0') {
    return Credential{
        new CredentialImpl{new GoogleAuthCredential(id_token, std::string{})}};
  } else if (access_token) {
    return Credential{new CredentialImpl{
        new GoogleAuthCredential(std::string{}, access_token)}};
  } else {
    return Credential{new CredentialImpl{
        new GoogleAuthCredential(std::string{}, std::string{})}};
  }
}

}  // namespace auth
}  // namespace firebase
