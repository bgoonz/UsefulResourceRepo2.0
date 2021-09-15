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

#define QPS_WORKER_H

#include <memory>

#include <grpc/support/atm.h>
#include <grpcpp/server.h>
#include <grpcpp/support/channel_arguments.h>
#include <grpcpp/support/config.h>

#include "test/cpp/qps/server.h"

namespace grpc {

namespace testing {

class WorkerServiceImpl;

extern std::vector<grpc::testing::Server*>* g_inproc_servers;

class QpsWorker {
 public:
  explicit QpsWorker(int driver_port, int server_port,
                     const grpc::string& credential_type);
  ~QpsWorker();

  bool Done() const;
  void MarkDone();

  std::shared_ptr<Channel> InProcessChannel(const ChannelArguments& args) {
    return server_->InProcessChannel(args);
  }

 private:
  std::unique_ptr<WorkerServiceImpl> impl_;
  std::unique_ptr<grpc::Server> server_;

  gpr_atm done_;
};

}  // namespace testing
}  // namespace grpc

#endif
