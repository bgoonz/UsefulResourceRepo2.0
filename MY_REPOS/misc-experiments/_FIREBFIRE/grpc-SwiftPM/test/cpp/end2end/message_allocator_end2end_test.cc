/*
 *
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *

#include <condition_variable>
#include <functional>
#include <memory>
#include <mutex>
#include <sstream>
#include <thread>

#include <google/protobuf/arena.h>

#include <grpc/impl/codegen/log.h>
#include <gtest/gtest.h>

#include <grpcpp/channel.h>
#include <grpcpp/client_context.h>
#include <grpcpp/create_channel.h>
#include <grpcpp/server.h>
#include <grpcpp/server_builder.h>
#include <grpcpp/server_context.h>
#include <grpcpp/support/client_callback.h>
#include <grpcpp/support/message_allocator.h>

#include "src/core/lib/iomgr/iomgr.h"
#include "src/proto/grpc/testing/echo.grpc.pb.h"
#include "test/core/util/port.h"
#include "test/core/util/test_config.h"
#include "test/cpp/util/test_credentials_provider.h"

// MAYBE_SKIP_TEST is a macro to determine if this particular test configuration
// should be skipped based on a decision made at SetUp time. In particular, any
// callback tests can only be run if the iomgr can run in the background or if
// the transport is in-process.
#define MAYBE_SKIP_TEST \
  do {                  \
    if (do_not_test_) { \
      return;           \
    }                   \
  } while (0)

namespace grpc {
namespace testing {
namespace {

class CallbackTestServiceImpl
    : public EchoTestService::ExperimentalCallbackService {
 public:
  explicit CallbackTestServiceImpl() {}

  void SetAllocatorMutator(
      std::function<void(experimental::RpcAllocatorState* allocator_state,
                         const EchoRequest* req, EchoResponse* resp)>
          mutator) {
    allocator_mutator_ = mutator;
  }

  experimental::ServerUnaryReactor* Echo(
      experimental::CallbackServerContext* context, const EchoRequest* request,
      EchoResponse* response) override {
    response->set_message(request->message());
    if (allocator_mutator_) {
      allocator_mutator_(context->GetRpcAllocatorState(), request, response);
    }
    auto* reactor = context->DefaultReactor();
    reactor->Finish(Status::OK);
    return reactor;
  }

 private:
  std::function<void(experimental::RpcAllocatorState* allocator_state,
                     const EchoRequest* req, EchoResponse* resp)>
      allocator_mutator_;
};

enum class Protocol { INPROC, TCP };

class TestScenario {
 public:
  TestScenario(Protocol protocol, const grpc::string& creds_type)
      : protocol(protocol), credentials_type(creds_type) {}
  void Log() const;
  Protocol protocol;
  const grpc::string credentials_type;
};

static std::ostream& operator<<(std::ostream& out,
                                const TestScenario& scenario) {
  return out << "TestScenario{protocol="
             << (scenario.protocol == Protocol::INPROC ? "INPROC" : "TCP")
             << "," << scenario.credentials_type << "}";
}

void TestScenario::Log() const {
  std::ostringstream out;
  out << *this;
  gpr_log(GPR_INFO, "%s", out.str().c_str());
}

class MessageAllocatorEnd2endTestBase
    : public ::testing::TestWithParam<TestScenario> {
 protected:
  MessageAllocatorEnd2endTestBase() {
    GetParam().Log();
    if (GetParam().protocol == Protocol::TCP) {
      if (!grpc_iomgr_run_in_background()) {
        do_not_test_ = true;
        return;
      }
    }
  }

  ~MessageAllocatorEnd2endTestBase() = default;

  void CreateServer(
      experimental::MessageAllocator<EchoRequest, EchoResponse>* allocator) {
    ServerBuilder builder;

    auto server_creds = GetCredentialsProvider()->GetServerCredentials(
        GetParam().credentials_type);
    if (GetParam().protocol == Protocol::TCP) {
      picked_port_ = grpc_pick_unused_port_or_die();
      server_address_ << "localhost:" << picked_port_;
      builder.AddListeningPort(server_address_.str(), server_creds);
    }
    callback_service_.SetMessageAllocatorFor_Echo(allocator);
    builder.RegisterService(&callback_service_);

    server_ = builder.BuildAndStart();
    is_server_started_ = true;
  }

  void ResetStub() {
    ChannelArguments args;
    auto channel_creds = GetCredentialsProvider()->GetChannelCredentials(
        GetParam().credentials_type, &args);
    switch (GetParam().protocol) {
      case Protocol::TCP:
        channel_ = ::grpc::CreateCustomChannel(server_address_.str(),
                                               channel_creds, args);
        break;
      case Protocol::INPROC:
        channel_ = server_->InProcessChannel(args);
        break;
      default:
        assert(false);
    }
    stub_ = EchoTestService::NewStub(channel_);
  }

  void TearDown() override {
    if (is_server_started_) {
      server_->Shutdown();
    }
    if (picked_port_ > 0) {
      grpc_recycle_unused_port(picked_port_);
    }
  }

  void SendRpcs(int num_rpcs) {
    grpc::string test_string("");
    for (int i = 0; i < num_rpcs; i++) {
      EchoRequest request;
      EchoResponse response;
      ClientContext cli_ctx;

      test_string += grpc::string(1024, 'x');
      request.set_message(test_string);
      grpc::string val;
      cli_ctx.set_compression_algorithm(GRPC_COMPRESS_GZIP);

      std::mutex mu;
      std::condition_variable cv;
      bool done = false;
      stub_->experimental_async()->Echo(
          &cli_ctx, &request, &response,
          [&request, &response, &done, &mu, &cv, val](Status s) {
            GPR_ASSERT(s.ok());

            EXPECT_EQ(request.message(), response.message());
            std::lock_guard<std::mutex> l(mu);
            done = true;
            cv.notify_one();
          });
      std::unique_lock<std::mutex> l(mu);
      while (!done) {
        cv.wait(l);
      }
    }
  }

  bool do_not_test_{false};
  bool is_server_started_{false};
  int picked_port_{0};
  std::shared_ptr<Channel> channel_;
  std::unique_ptr<EchoTestService::Stub> stub_;
  CallbackTestServiceImpl callback_service_;
  std::unique_ptr<Server> server_;
  std::ostringstream server_address_;
};

class NullAllocatorTest : public MessageAllocatorEnd2endTestBase {};

TEST_P(NullAllocatorTest, SimpleRpc) {
  MAYBE_SKIP_TEST;
  CreateServer(nullptr);
  ResetStub();
  SendRpcs(1);
}

class SimpleAllocatorTest : public MessageAllocatorEnd2endTestBase {
 public:
  class SimpleAllocator
      : public experimental::MessageAllocator<EchoRequest, EchoResponse> {
   public:
    class MessageHolderImpl
        : public experimental::MessageHolder<EchoRequest, EchoResponse> {
     public:
      MessageHolderImpl(int* request_deallocation_count,
                        int* messages_deallocation_count)
          : request_deallocation_count_(request_deallocation_count),
            messages_deallocation_count_(messages_deallocation_count) {
        set_request(new EchoRequest);
        set_response(new EchoResponse);
      }
      void Release() override {
        (*messages_deallocation_count_)++;
        delete request();
        delete response();
        delete this;
      }
      void FreeRequest() override {
        (*request_deallocation_count_)++;
        delete request();
        set_request(nullptr);
      }

      EchoRequest* ReleaseRequest() {
        auto* ret = request();
        set_request(nullptr);
        return ret;
      }

     private:
      int* request_deallocation_count_;
      int* messages_deallocation_count_;
    };
    experimental::MessageHolder<EchoRequest, EchoResponse>* AllocateMessages()
        override {
      allocation_count++;
      return new MessageHolderImpl(&request_deallocation_count,
                                   &messages_deallocation_count);
    }
    int allocation_count = 0;
    int request_deallocation_count = 0;
    int messages_deallocation_count = 0;
  };
};

TEST_P(SimpleAllocatorTest, SimpleRpc) {
  MAYBE_SKIP_TEST;
  const int kRpcCount = 10;
  std::unique_ptr<SimpleAllocator> allocator(new SimpleAllocator);
  CreateServer(allocator.get());
  ResetStub();
  SendRpcs(kRpcCount);
  EXPECT_EQ(kRpcCount, allocator->allocation_count);
  EXPECT_EQ(kRpcCount, allocator->messages_deallocation_count);
  EXPECT_EQ(0, allocator->request_deallocation_count);
}

TEST_P(SimpleAllocatorTest, RpcWithEarlyFreeRequest) {
  MAYBE_SKIP_TEST;
  const int kRpcCount = 10;
  std::unique_ptr<SimpleAllocator> allocator(new SimpleAllocator);
  auto mutator = [](experimental::RpcAllocatorState* allocator_state,
                    const EchoRequest* req, EchoResponse* resp) {
    auto* info =
        static_cast<SimpleAllocator::MessageHolderImpl*>(allocator_state);
    EXPECT_EQ(req, info->request());
    EXPECT_EQ(resp, info->response());
    allocator_state->FreeRequest();
    EXPECT_EQ(nullptr, info->request());
  };
  callback_service_.SetAllocatorMutator(mutator);
  CreateServer(allocator.get());
  ResetStub();
  SendRpcs(kRpcCount);
  EXPECT_EQ(kRpcCount, allocator->allocation_count);
  EXPECT_EQ(kRpcCount, allocator->messages_deallocation_count);
  EXPECT_EQ(kRpcCount, allocator->request_deallocation_count);
}

TEST_P(SimpleAllocatorTest, RpcWithReleaseRequest) {
  MAYBE_SKIP_TEST;
  const int kRpcCount = 10;
  std::unique_ptr<SimpleAllocator> allocator(new SimpleAllocator);
  std::vector<EchoRequest*> released_requests;
  auto mutator = [&released_requests](
                     experimental::RpcAllocatorState* allocator_state,
                     const EchoRequest* req, EchoResponse* resp) {
    auto* info =
        static_cast<SimpleAllocator::MessageHolderImpl*>(allocator_state);
    EXPECT_EQ(req, info->request());
    EXPECT_EQ(resp, info->response());
    released_requests.push_back(info->ReleaseRequest());
    EXPECT_EQ(nullptr, info->request());
  };
  callback_service_.SetAllocatorMutator(mutator);
  CreateServer(allocator.get());
  ResetStub();
  SendRpcs(kRpcCount);
  EXPECT_EQ(kRpcCount, allocator->allocation_count);
  EXPECT_EQ(kRpcCount, allocator->messages_deallocation_count);
  EXPECT_EQ(0, allocator->request_deallocation_count);
  EXPECT_EQ(static_cast<unsigned>(kRpcCount), released_requests.size());
  for (auto* req : released_requests) {
    delete req;
  }
}

class ArenaAllocatorTest : public MessageAllocatorEnd2endTestBase {
 public:
  class ArenaAllocator
      : public experimental::MessageAllocator<EchoRequest, EchoResponse> {
   public:
    class MessageHolderImpl
        : public experimental::MessageHolder<EchoRequest, EchoResponse> {
     public:
      MessageHolderImpl() {
        set_request(
            google::protobuf::Arena::CreateMessage<EchoRequest>(&arena_));
        set_response(
            google::protobuf::Arena::CreateMessage<EchoResponse>(&arena_));
      }
      void Release() override { delete this; }
      void FreeRequest() override { GPR_ASSERT(0); }

     private:
      google::protobuf::Arena arena_;
    };
    experimental::MessageHolder<EchoRequest, EchoResponse>* AllocateMessages()
        override {
      allocation_count++;
      return new MessageHolderImpl;
    }
    int allocation_count = 0;
  };
};

TEST_P(ArenaAllocatorTest, SimpleRpc) {
  MAYBE_SKIP_TEST;
  const int kRpcCount = 10;
  std::unique_ptr<ArenaAllocator> allocator(new ArenaAllocator);
  CreateServer(allocator.get());
  ResetStub();
  SendRpcs(kRpcCount);
  EXPECT_EQ(kRpcCount, allocator->allocation_count);
}

std::vector<TestScenario> CreateTestScenarios(bool test_insecure) {
  std::vector<TestScenario> scenarios;
  std::vector<grpc::string> credentials_types{
      GetCredentialsProvider()->GetSecureCredentialsTypeList()};
  auto insec_ok = [] {
    // Only allow insecure credentials type when it is registered with the
    // provider. User may create providers that do not have insecure.
    return GetCredentialsProvider()->GetChannelCredentials(
               kInsecureCredentialsType, nullptr) != nullptr;
  };
  if (test_insecure && insec_ok()) {
    credentials_types.push_back(kInsecureCredentialsType);
  }
  GPR_ASSERT(!credentials_types.empty());

  Protocol parr[]{Protocol::INPROC, Protocol::TCP};
  for (Protocol p : parr) {
    for (const auto& cred : credentials_types) {
      // TODO(vjpai): Test inproc with secure credentials when feasible
      if (p == Protocol::INPROC &&
          (cred != kInsecureCredentialsType || !insec_ok())) {
        continue;
      }
      scenarios.emplace_back(p, cred);
    }
  }
  return scenarios;
}

INSTANTIATE_TEST_SUITE_P(NullAllocatorTest, NullAllocatorTest,
                         ::testing::ValuesIn(CreateTestScenarios(true)));
INSTANTIATE_TEST_SUITE_P(SimpleAllocatorTest, SimpleAllocatorTest,
                         ::testing::ValuesIn(CreateTestScenarios(true)));
INSTANTIATE_TEST_SUITE_P(ArenaAllocatorTest, ArenaAllocatorTest,
                         ::testing::ValuesIn(CreateTestScenarios(true)));

}  // namespace
}  // namespace testing
}  // namespace grpc

int main(int argc, char** argv) {
  grpc::testing::TestEnvironment env(argc, argv);
  // The grpc_init is to cover the MAYBE_SKIP_TEST.
  grpc_init();
  ::testing::InitGoogleTest(&argc, argv);
  int ret = RUN_ALL_TESTS();
  grpc_shutdown();
  return ret;
}
