/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
ent_callback_impl.h>

#include "src/core/lib/iomgr/closure.h"
#include "src/core/lib/iomgr/exec_ctx.h"
#include "src/core/lib/iomgr/executor.h"

namespace grpc_impl {
namespace internal {

void ClientReactor::InternalScheduleOnDone(grpc::Status s) {
  // Unlike other uses of closure, do not Ref or Unref here since the reactor
  // object's lifetime is controlled by user code.
  grpc_core::ExecCtx exec_ctx;
  struct ClosureWithArg {
    grpc_closure closure;
    ClientReactor* const reactor;
    const grpc::Status status;
    ClosureWithArg(ClientReactor* reactor_arg, grpc::Status s)
        : reactor(reactor_arg), status(std::move(s)) {
      GRPC_CLOSURE_INIT(&closure,
                        [](void* void_arg, grpc_error*) {
                          ClosureWithArg* arg =
                              static_cast<ClosureWithArg*>(void_arg);
                          arg->reactor->OnDone(arg->status);
                          delete arg;
                        },
                        this, grpc_schedule_on_exec_ctx);
    }
  };
  ClosureWithArg* arg = new ClosureWithArg(this, std::move(s));
  grpc_core::Executor::Run(&arg->closure, GRPC_ERROR_NONE);
}

}  // namespace internal
}  // namespace grpc_impl
