/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

#include <ostream>

namespace firebase {
namespace firestore {

std::string SnapshotMetadata::ToString() const {
  return std::string("SnapshotMetadata{") +
         "has_pending_writes=" + (has_pending_writes() ? "true" : "false") +
         ", is_from_cache=" + (is_from_cache() ? "true" : "false") + '}';
}

std::ostream& operator<<(std::ostream& out, const SnapshotMetadata& metadata) {
  return out << metadata.ToString();
}

}  // namespace firestore
}  // namespace firebase
