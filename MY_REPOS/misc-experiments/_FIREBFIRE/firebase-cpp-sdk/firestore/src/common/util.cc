/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

namespace firebase {
namespace firestore {

const std::string& EmptyString() {
  static const std::string kEmptyString;
  return kEmptyString;
}

}  // namespace firestore
}  // namespace firebase
