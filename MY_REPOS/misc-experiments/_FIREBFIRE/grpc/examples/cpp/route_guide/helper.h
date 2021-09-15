/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
DE_HELPER_H_
#define GRPC_COMMON_CPP_ROUTE_GUIDE_HELPER_H_

#include <string>
#include <vector>

namespace routeguide {
class Feature;

std::string GetDbFileContent(int argc, char** argv);

void ParseDb(const std::string& db, std::vector<Feature>* feature_list);

}  // namespace routeguide

#endif  // GRPC_COMMON_CPP_ROUTE_GUIDE_HELPER_H_

