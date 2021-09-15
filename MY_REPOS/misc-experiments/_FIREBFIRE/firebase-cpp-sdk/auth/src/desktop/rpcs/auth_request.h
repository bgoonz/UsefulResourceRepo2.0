/*
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
_RPCS_AUTH_REQUEST_H_

#include "app/rest/request_json.h"
#include "auth/request_generated.h"
#include "auth/request_resource.h"

namespace firebase {
namespace auth {

// Key name for header when sending language code data.
extern const char* kHeaderFirebaseLocale;

class AuthRequest
    : public firebase::rest::RequestJson<fbs::Request, fbs::RequestT> {
 public:
  explicit AuthRequest(const char* schema);

  explicit AuthRequest(const unsigned char* schema)
      : AuthRequest(reinterpret_cast<const char*>(schema)) {}
};

}  // namespace auth
}  // namespace firebase

#endif  // FIREBASE_AUTH_SRC_DESKTOP_RPCS_AUTH_REQUEST_H_
