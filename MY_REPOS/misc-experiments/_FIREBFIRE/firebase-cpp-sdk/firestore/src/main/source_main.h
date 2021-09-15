/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
IN_SOURCE_MAIN_H_

#include "Firestore/core/src/api/source.h"
#include "firestore/src/common/hard_assert_common.h"
#include "firestore/src/include/firebase/firestore/source.h"

#if defined(__ANDROID__)
#error "This header should not be used on Android."
#endif

namespace firebase {
namespace firestore {

inline api::Source ToCoreApi(Source source) {
  switch (source) {
    case Source::kDefault:
      return api::Source::Default;
    case Source::kServer:
      return api::Source::Server;
    case Source::kCache:
      return api::Source::Cache;
  }
  UNREACHABLE();
}

}  // namespace firestore
}  // namespace firebase

#endif  // FIREBASE_FIRESTORE_SRC_MAIN_SOURCE_MAIN_H_
