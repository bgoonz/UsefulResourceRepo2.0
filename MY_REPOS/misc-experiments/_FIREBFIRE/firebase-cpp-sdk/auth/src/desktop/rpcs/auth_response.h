/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
_RPCS_AUTH_RESPONSE_H_

#include <string>

#include "app/rest/response_json.h"
#include "auth/response_generated.h"
#include "auth/response_resource.h"
#include "auth/src/desktop/rpcs/error_codes.h"

namespace firebase {
namespace auth {

class AuthResponse
    : public firebase::rest::ResponseJson<fbs::Response, fbs::ResponseT> {
 public:
  AuthResponse() : ResponseJson(response_resource_data) {}

  // Visual Studio 2013 and below don't generate implicitly-defined move
  // constructors.
  AuthResponse(AuthResponse&& rhs) : ResponseJson(std::move(rhs)) {}

  AuthError error_code() const;
  bool IsSuccessful() const;

  std::string error_message() const {
    return application_data_->error ? application_data_->error->message
                                    : std::string();
  }
};

}  // namespace auth
}  // namespace firebase

#endif  // FIREBASE_AUTH_SRC_DESKTOP_RPCS_AUTH_RESPONSE_H_
