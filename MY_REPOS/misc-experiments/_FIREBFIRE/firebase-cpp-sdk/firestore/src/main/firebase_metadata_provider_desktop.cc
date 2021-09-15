/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

#include "app/src/heartbeat_info_desktop.h"
#include "app/src/include/firebase/app.h"

namespace firebase {
namespace firestore {

void FirebaseMetadataProviderCpp::UpdateMetadata(grpc::ClientContext& context) {
  HeartbeatInfo::Code heartbeat = HeartbeatInfo::GetHeartbeatCode("fire-fst");

  // TODO(varconst): don't send any headers if the heartbeat is "none". This
  // should only be changed once it's possible to notify the heartbeat that the
  // previous attempt to send it has failed.
  if (heartbeat != HeartbeatInfo::Code::None) {
    context.AddMetadata(kXFirebaseClientLogTypeHeader,
                        std::to_string(static_cast<int>(heartbeat)));
  }

  context.AddMetadata(kXFirebaseClientHeader, App::GetUserAgent());
}

}  // namespace firestore
}  // namespace firebase
