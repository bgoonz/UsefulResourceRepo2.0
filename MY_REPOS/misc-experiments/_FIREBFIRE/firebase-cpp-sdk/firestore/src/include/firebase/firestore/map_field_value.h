/*
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
CLUDE_FIREBASE_FIRESTORE_MAP_FIELD_VALUE_H_

#include <string>
#include <unordered_map>

namespace firebase {
namespace firestore {

class FieldPath;
class FieldValue;

/** @brief A map of `FieldValue`s indexed by stringified field paths. */
using MapFieldValue = std::unordered_map<std::string, FieldValue>;
/** @brief A map of `FieldValue`s indexed by field paths. */
using MapFieldPathValue = std::unordered_map<FieldPath, FieldValue>;

}  // namespace firestore
}  // namespace firebase

#endif  // FIREBASE_FIRESTORE_SRC_INCLUDE_FIREBASE_FIRESTORE_MAP_FIELD_VALUE_H_
