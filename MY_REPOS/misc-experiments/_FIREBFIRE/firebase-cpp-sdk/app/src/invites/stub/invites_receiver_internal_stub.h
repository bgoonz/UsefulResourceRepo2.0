/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
STUB_INVITES_RECEIVER_INTERNAL_STUB_H_

#include "app/src/invites/invites_receiver_internal.h"

namespace firebase {
class App;
namespace invites {
namespace internal {

// Stub version of InvitesReceiverInternal, for use on desktop platforms. This
// version will simply not be able to fetch or convert invitations, and will
// return an error if you try.
class InvitesReceiverInternalStub : public InvitesReceiverInternal {
 public:
  explicit InvitesReceiverInternalStub(const ::firebase::App& app)
      : InvitesReceiverInternal(app) {}
  virtual ~InvitesReceiverInternalStub();                           // NOLINT
  virtual bool PerformFetch();                                      // NOLINT
  virtual bool PerformConvertInvitation(const char* /* unused */);  // NOLINT
};

}  // namespace internal
}  // namespace invites
}  // namespace firebase

#endif  // FIREBASE_APP_SRC_INVITES_STUB_INVITES_RECEIVER_INTERNAL_STUB_H_
