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
HARP_GENERATOR_HELPERS_H
#define GRPC_INTERNAL_COMPILER_CSHARP_GENERATOR_HELPERS_H

#include "src/compiler/config.h"
#include "src/compiler/generator_helpers.h"

namespace grpc_csharp_generator {

inline bool ServicesFilename(const grpc::protobuf::FileDescriptor* file,
                             grpc::string* file_name_or_error) {
  *file_name_or_error =
      grpc_generator::FileNameInUpperCamel(file, false) + "Grpc.cs";
  return true;
}

// Get leading or trailing comments in a string. Comment lines start with "// ".
// Leading detached comments are put in front of leading comments.
template <typename DescriptorType>
inline grpc::string GetCsharpComments(const DescriptorType* desc,
                                      bool leading) {
  return grpc_generator::GetPrefixedComments(desc, leading, "//");
}

}  // namespace grpc_csharp_generator

#endif  // GRPC_INTERNAL_COMPILER_CSHARP_GENERATOR_HELPERS_H
