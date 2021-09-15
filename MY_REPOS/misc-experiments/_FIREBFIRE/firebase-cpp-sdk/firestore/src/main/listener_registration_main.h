/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
IN_LISTENER_REGISTRATION_MAIN_H_

#include <memory>

#include "Firestore/core/src/api/listener_registration.h"
#include "firestore/src/main/firestore_main.h"

#if defined(__ANDROID__)
#error "This header should not be used on Android."
#endif

namespace firebase {
namespace firestore {

class ListenerRegistrationInternal {
 public:
  ListenerRegistrationInternal(
      std::unique_ptr<api::ListenerRegistration> registration,
      FirestoreInternal* firestore);
  ~ListenerRegistrationInternal();

  ListenerRegistrationInternal(const ListenerRegistrationInternal&) = delete;
  ListenerRegistrationInternal& operator=(const ListenerRegistrationInternal&) =
      delete;

  FirestoreInternal* firestore_internal() { return firestore_; }

 private:
  friend class FirestoreInternal;

  void Remove() { registration_->Remove(); }

  std::unique_ptr<api::ListenerRegistration> registration_;
  FirestoreInternal* firestore_ = nullptr;
};

}  // namespace firestore
}  // namespace firebase

#endif  // FIREBASE_FIRESTORE_SRC_MAIN_LISTENER_REGISTRATION_MAIN_H_
