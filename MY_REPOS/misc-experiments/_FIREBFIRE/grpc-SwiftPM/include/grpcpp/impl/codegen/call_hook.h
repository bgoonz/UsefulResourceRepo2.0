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
HOOK_H
#define GRPCPP_IMPL_CODEGEN_CALL_HOOK_H

namespace grpc {

namespace internal {
class CallOpSetInterface;
class Call;

/// This is an interface that Channel and Server implement to allow them to hook
/// performing ops.
class CallHook {
 public:
  virtual ~CallHook() {}
  virtual void PerformOpsOnCall(CallOpSetInterface* ops, Call* call) = 0;
};
}  // namespace internal

}  // namespace grpc

#endif  // GRPCPP_IMPL_CODEGEN_CALL_HOOK_H
