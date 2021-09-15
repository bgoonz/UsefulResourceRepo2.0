/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

namespace firebase {
namespace firestore {
namespace internal {

ReferenceCountedFutureImpl* GetSharedReferenceCountedFutureImpl() {
  static auto* futures =
      new ReferenceCountedFutureImpl(/*last_result_count=*/0);
  return futures;
}

}  // namespace internal
}  // namespace firestore
}  // namespace firebase
