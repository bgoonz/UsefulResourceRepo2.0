/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *

#include <memory>
#include <utility>

#include "app/src/callback.h"

namespace firebase {
namespace firestore {
namespace csharp {

namespace {

class ProgressCallback {
 public:
  ProgressCallback(LoadBundleTaskProgressCallback callback, int32_t callback_id,
                   std::unique_ptr<LoadBundleTaskProgress> progress)
      : callback_(callback),
        callback_id_(callback_id),
        progress_(std::move(progress)) {}

  static void Run(ProgressCallback* callback) { callback->Run(); }

 private:
  void Run() {
    // Ownership of the progress pointer is passed to C#.
    callback_(callback_id_, progress_.release());
  }

  LoadBundleTaskProgressCallback callback_ = nullptr;
  int32_t callback_id_ = -1;
  std::unique_ptr<LoadBundleTaskProgress> progress_;
};

}  // namespace

void LoadBundleWithCallback(Firestore* firestore,
                            const std::string& bundle_data, int32_t callback_id,
                            LoadBundleTaskProgressCallback callback) {
  auto progress_listener =
      [callback, callback_id](const LoadBundleTaskProgress& progress) {
        // NOLINTNEXTLINE(modernize-make-unique)
        std::unique_ptr<LoadBundleTaskProgress> progress_ptr(
            new LoadBundleTaskProgress(progress));
        ProgressCallback progress_callback(callback, callback_id,
                                           std::move(progress_ptr));
        auto* callback = new callback::CallbackMoveValue1<ProgressCallback>(
            std::move(progress_callback), ProgressCallback::Run);
        callback::AddCallback(callback);
      };
  firestore->LoadBundle(bundle_data, progress_listener);
}

}  // namespace csharp
}  // namespace firestore
}  // namespace firebase
