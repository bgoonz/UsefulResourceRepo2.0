/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
IL_AUTOID_H_

#include <string>

namespace firebase {
namespace firestore {
namespace util {

// Generates a random ID suitable for use as a document ID.
std::string CreateAutoId();

}  // namespace util
}  // namespace firestore
}  // namespace firebase

#endif  // FIRESTORE_TEST_ANDROID_UTIL_AUTOID_H_
