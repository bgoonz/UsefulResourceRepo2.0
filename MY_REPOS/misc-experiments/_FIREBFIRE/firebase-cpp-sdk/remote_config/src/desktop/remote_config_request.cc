/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

#include "app/src/app_common.h"

namespace firebase {
namespace remote_config {
namespace internal {

RemoteConfigRequest::RemoteConfigRequest(const char* schema)
    : RequestJson(schema) {
  add_header(app_common::kApiClientHeader, App::GetUserAgent());
}

}  // namespace internal
}  // namespace remote_config
}  // namespace firebase
