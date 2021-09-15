/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
_AUTH_PROVIDERS_FACEBOOK_AUTH_CREDENTIAL_H_

#include "auth/src/desktop/auth_constants.h"
#include "auth/src/desktop/identity_provider_credential.h"
#include "auth/src/desktop/rpcs/verify_assertion_request.h"

namespace firebase {
namespace auth {

class FacebookAuthProvider;

class FacebookAuthCredential : public IdentityProviderCredential {
 public:
  std::string GetProvider() const override { return kFacebookAuthProviderId; }

  std::unique_ptr<VerifyAssertionRequest> CreateVerifyAssertionRequest(
      const char* const api_key) const override {
    return VerifyAssertionRequest::FromAccessToken(
        api_key, GetProvider().c_str(), access_token_.c_str());
  }

 private:
  explicit FacebookAuthCredential(const std::string& access_token)
      : access_token_(access_token) {}

  const std::string access_token_;

  friend class FacebookAuthProvider;
};

}  // namespace auth
}  // namespace firebase

#endif  // FIREBASE_AUTH_SRC_DESKTOP_AUTH_PROVIDERS_FACEBOOK_AUTH_CREDENTIAL_H_
