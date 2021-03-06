/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

#include <dispatch/dispatch.h>

#include "absl/memory/memory.h"
#include "Firestore/core/src/util/executor_libdispatch.h"

namespace firebase {
namespace firestore {

namespace {

const char kDefaultHost[] = "firestore.googleapis.com";

}

using util::Executor;
using util::ExecutorLibdispatch;

Settings::Settings()
    : host_(kDefaultHost),
      executor_(Executor::CreateSerial("com.google.firebase.firestore.callback")) {}

std::unique_ptr<Executor> Settings::CreateExecutor() const {
  return absl::make_unique<ExecutorLibdispatch>(dispatch_queue());
}

dispatch_queue_t Settings::dispatch_queue() const {
  if (!executor_) {
    return dispatch_get_main_queue();
  }
  auto* executor_libdispatch = static_cast<const ExecutorLibdispatch*>(executor_.get());
  return executor_libdispatch->dispatch_queue();
}

void Settings::set_dispatch_queue(dispatch_queue_t queue) {
  executor_ = absl::make_unique<ExecutorLibdispatch>(queue);
}

}  // namespace firestore
}  // namespace firebase
