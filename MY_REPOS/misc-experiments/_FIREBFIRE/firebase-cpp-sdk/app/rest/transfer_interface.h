/*
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
R_INTERFACE_H_

namespace firebase {
namespace rest {

class Transfer {
 public:
  virtual ~Transfer() {}

  // Mark the transfer completed.
  virtual void MarkCompleted() = 0;

  // Mark the transfer failed, usually from cancellation or timeout.
  virtual void MarkFailed() = 0;
};

}  // namespace rest
}  // namespace firebase

#endif  // FIREBASE_APP_REST_TRANSFER_INTERFACE_H_
