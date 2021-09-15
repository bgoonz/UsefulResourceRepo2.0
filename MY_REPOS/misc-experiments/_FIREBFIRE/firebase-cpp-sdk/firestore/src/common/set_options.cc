/*
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

#include "app/meta/move.h"

namespace firebase {
namespace firestore {

SetOptions::SetOptions(Type type, std::unordered_set<FieldPath> fields)
    : type_(type), fields_(firebase::Move(fields)) {}

SetOptions::~SetOptions() {}

/* static */
SetOptions SetOptions::Merge() {
  return SetOptions{Type::kMergeAll, std::unordered_set<FieldPath>{}};
}

/* static */
SetOptions SetOptions::MergeFields(const std::vector<std::string>& fields) {
  std::unordered_set<FieldPath> field_paths;
  field_paths.reserve(fields.size());
  for (const std::string& field : fields) {
    field_paths.insert(FieldPath::FromDotSeparatedString(field));
  }
  return SetOptions{Type::kMergeSpecific, firebase::Move(field_paths)};
}

/* static */
SetOptions SetOptions::MergeFieldPaths(const std::vector<FieldPath>& fields) {
  return SetOptions{Type::kMergeSpecific, std::unordered_set<FieldPath>(
                                              fields.begin(), fields.end())};
}

}  // namespace firestore
}  // namespace firebase
