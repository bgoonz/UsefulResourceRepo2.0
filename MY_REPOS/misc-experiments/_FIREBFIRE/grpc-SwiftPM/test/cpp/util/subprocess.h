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
CESS_H
#define GRPC_TEST_CPP_UTIL_SUBPROCESS_H

#include <initializer_list>
#include <string>
#include <vector>

struct gpr_subprocess;

namespace grpc {

class SubProcess {
 public:
  SubProcess(const std::vector<std::string>& args);
  ~SubProcess();

  int Join();
  void Interrupt();

 private:
  SubProcess(const SubProcess& other);
  SubProcess& operator=(const SubProcess& other);

  gpr_subprocess* const subprocess_;
};

}  // namespace grpc

#endif  // GRPC_TEST_CPP_UTIL_SUBPROCESS_H
