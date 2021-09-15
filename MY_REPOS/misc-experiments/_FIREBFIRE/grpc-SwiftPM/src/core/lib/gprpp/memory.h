/*
 *
 * Copyright 2017 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
Y_H
#define GRPC_CORE_LIB_GPRPP_MEMORY_H

#include <grpc/support/port_platform.h>

#include <grpc/support/alloc.h>
#include <grpc/support/log.h>

#include <limits>
#include <memory>
#include <utility>

#include "absl/memory/memory.h"

namespace grpc_core {

class DefaultDeleteChar {
 public:
  void operator()(char* p) {
    if (p == nullptr) return;
    gpr_free(p);
  }
};

// UniquePtr<T> is only allowed for char and UniquePtr<char> is deprecated
// in favor of std::string. UniquePtr<char> is equivalent std::unique_ptr
// except that it uses gpr_free for deleter.
template <typename T>
using UniquePtr = std::unique_ptr<T, DefaultDeleteChar>;

}  // namespace grpc_core

#endif /* GRPC_CORE_LIB_GPRPP_MEMORY_H */
