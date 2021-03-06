/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *


#include <stdint.h>

namespace firebase {
namespace internal {

// Universally unique value.
struct Uuid {
  uint8_t data[16];

  // Generate a UUID in this structure.
  void Generate();
};

}  // namespace internal
}  // namespace firebase

#endif  // FIREBASE_APP_SRC_UUID_H_
