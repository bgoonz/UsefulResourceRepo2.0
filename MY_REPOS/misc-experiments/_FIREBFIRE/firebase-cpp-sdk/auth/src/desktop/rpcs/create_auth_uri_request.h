/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
_RPCS_CREATE_AUTH_URI_REQUEST_H_

#include "auth/request_generated.h"
#include "auth/request_resource.h"
#include "auth/src/desktop/rpcs/auth_request.h"

namespace firebase {
namespace auth {

class CreateAuthUriRequest : public AuthRequest {
 public:
  CreateAuthUriRequest(const char* api_key, const char* identifier);
};

}  // namespace auth
}  // namespace firebase

#endif  // FIREBASE_AUTH_SRC_DESKTOP_RPCS_CREATE_AUTH_URI_REQUEST_H_
