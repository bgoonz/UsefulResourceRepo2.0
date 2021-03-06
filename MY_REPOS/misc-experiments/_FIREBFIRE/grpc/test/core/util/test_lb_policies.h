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
LB_POLICIES_H
#define GRPC_TEST_CORE_UTIL_TEST_LB_POLICIES_H

#include "src/core/ext/filters/client_channel/lb_policy.h"

namespace grpc_core {

using MetadataVector = std::vector<std::pair<std::string, std::string>>;

struct PickArgsSeen {
  std::string path;
  MetadataVector metadata;
};

using TestPickArgsCallback = std::function<void(const PickArgsSeen&)>;

// Registers an LB policy called "test_pick_args_lb" that checks the args
// passed to SubchannelPicker::Pick().
void RegisterTestPickArgsLoadBalancingPolicy(TestPickArgsCallback cb);

struct TrailingMetadataArgsSeen {
  const LoadBalancingPolicy::BackendMetricData* backend_metric_data;
  MetadataVector metadata;
};

using InterceptRecvTrailingMetadataCallback =
    std::function<void(const TrailingMetadataArgsSeen&)>;

// Registers an LB policy called "intercept_trailing_metadata_lb" that
// invokes cb with argument user_data when trailing metadata is received
// for each call.
void RegisterInterceptRecvTrailingMetadataLoadBalancingPolicy(
    InterceptRecvTrailingMetadataCallback cb);

}  // namespace grpc_core

#endif  // GRPC_TEST_CORE_UTIL_TEST_LB_POLICIES_H
