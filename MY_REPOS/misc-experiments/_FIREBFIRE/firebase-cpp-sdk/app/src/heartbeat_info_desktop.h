/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
T_INFO_DESKTOP_H_

namespace firebase {

// Gets the heartbeat code for a given SDK, updating the "last sent" time if
// necessary. See
// https://docs.google.com/document/d/10HSyILJ3l2XiDxuq_F3xlsSJpyLiYp3T9MkREXAuM6Q
// for further details.
//
// This class should only be used on desktop platforms. Mobile platforms should
// rely on the platform-specific implementation of the heartbeat to avoid
// double-counting.
class HeartbeatInfo {
 public:
  enum class Code { None = 0, Sdk = 1, Global = 2, Combined = 3 };

  // Gets the heartbeat code for the SDK identified by the given `tag`. If the
  // returned code is not `None`, the "last sent" time for the corresponding SDK
  // is updated (and persisted).
  static Code GetHeartbeatCode(const char* tag);
};

}  // namespace firebase

#endif  // FIREBASE_APP_SRC_HEARTBEAT_INFO_DESKTOP_H_
