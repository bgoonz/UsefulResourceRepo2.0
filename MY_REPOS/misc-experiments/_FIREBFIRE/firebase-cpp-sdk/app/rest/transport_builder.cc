/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

#include "app/rest/transport_curl.h"
#include "flatbuffers/stl_emulation.h"

namespace firebase {
namespace rest {

namespace {
// The default transport builder.
flatbuffers::unique_ptr<Transport> (*g_transport_builder)() = nullptr;
}  // namespace

flatbuffers::unique_ptr<Transport> CreateTransport() {
  if (g_transport_builder) {
    return g_transport_builder();
  } else {
    return flatbuffers::unique_ptr<Transport>(new TransportCurl());
  }
}

void SetTransportBuilder(flatbuffers::unique_ptr<Transport> (*builder)()) {
  g_transport_builder = builder;
}

}  // namespace rest
}  // namespace firebase
