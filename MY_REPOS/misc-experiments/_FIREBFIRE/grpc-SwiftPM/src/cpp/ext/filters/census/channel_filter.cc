/*
 *
 * Copyright 2018 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
orm.h>

#include "src/cpp/ext/filters/census/channel_filter.h"

namespace grpc {

grpc_error* CensusChannelData::Init(grpc_channel_element* elem,
                                    grpc_channel_element_args* args) {
  return GRPC_ERROR_NONE;
}

}  // namespace grpc
