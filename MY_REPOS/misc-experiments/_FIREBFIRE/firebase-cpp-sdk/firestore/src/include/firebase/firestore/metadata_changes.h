/*
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
CLUDE_FIREBASE_FIRESTORE_METADATA_CHANGES_H_

namespace firebase {
namespace firestore {

/**
 * Indicates whether metadata-only changes (that is,
 * DocumentSnapshot::metadata() or QuerySnapshot::metadata() changed) should
 * trigger snapshot events.
 */
enum class MetadataChanges {
  /** Snapshot events will not be triggered by metadata-only changes. */
  kExclude,

  /**
   * Snapshot events will be triggered by any changes, including metadata-only
   * changes.
   */
  kInclude,
};

}  // namespace firestore
}  // namespace firebase
#endif  // FIREBASE_FIRESTORE_SRC_INCLUDE_FIREBASE_FIRESTORE_METADATA_CHANGES_H_
