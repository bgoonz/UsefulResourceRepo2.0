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

#include <unordered_map>

#include <gflags/gflags.h>
#include <grpc/grpc.h>
#include <grpc/support/alloc.h>
#include <grpc/support/log.h>
#include <grpcpp/channel.h>
#include <grpcpp/client_context.h>

#include "src/core/lib/gpr/string.h"
#include "test/core/util/test_config.h"
#include "test/cpp/interop/client_helper.h"
#include "test/cpp/interop/interop_client.h"
#include "test/cpp/util/test_config.h"

DEFINE_bool(use_alts, false,
            "Whether to use alts. Enable alts will disable tls.");
DEFINE_bool(use_tls, false, "Whether to use tls.");
DEFINE_string(custom_credentials_type, "", "User provided credentials type.");
DEFINE_bool(use_test_ca, false, "False to use SSL roots for google");
DEFINE_int32(server_port, 0, "Server port.");
DEFINE_string(server_host, "localhost", "Server host to connect to");
DEFINE_string(server_host_override, "",
              "Override the server host which is sent in HTTP header");
DEFINE_string(
    test_case, "large_unary",
    "Configure different test cases. Valid options are:\n\n"
    "all : all test cases;\n"
    "cancel_after_begin : cancel stream after starting it;\n"
    "cancel_after_first_response: cancel on first response;\n"
    "channel_soak: sends 'soak_iterations' rpcs, rebuilds channel each time;\n"
    "client_compressed_streaming : compressed request streaming with "
    "client_compressed_unary : single compressed request;\n"
    "client_streaming : request streaming with single response;\n"
    "compute_engine_creds: large_unary with compute engine auth;\n"
    "custom_metadata: server will echo custom metadata;\n"
    "empty_stream : bi-di stream with no request/response;\n"
    "empty_unary : empty (zero bytes) request and response;\n"
    "google_default_credentials: large unary using GDC;\n"
    "half_duplex : half-duplex streaming;\n"
    "jwt_token_creds: large_unary with JWT token auth;\n"
    "large_unary : single request and (large) response;\n"
    "long_lived_channel: sends large_unary rpcs over a long-lived channel;\n"
    "oauth2_auth_token: raw oauth2 access token auth;\n"
    "per_rpc_creds: raw oauth2 access token on a single rpc;\n"
    "ping_pong : full-duplex streaming;\n"
    "response streaming;\n"
    "rpc_soak: 'sends soak_iterations' large_unary rpcs;\n"
    "server_compressed_streaming : single request with compressed "
    "server_compressed_unary : single compressed response;\n"
    "server_streaming : single request with response streaming;\n"
    "slow_consumer : single request with response streaming with "
    "slow client consumer;\n"
    "status_code_and_message: verify status code & message;\n"
    "timeout_on_sleeping_server: deadline exceeds on stream;\n"
    "unimplemented_method: client calls an unimplemented method;\n"
    "unimplemented_service: client calls an unimplemented service;\n");
DEFINE_string(default_service_account, "",
              "Email of GCE default service account");
DEFINE_string(service_account_key_file, "",
              "Path to service account json key file.");
DEFINE_string(oauth_scope, "", "Scope for OAuth tokens.");
DEFINE_bool(do_not_abort_on_transient_failures, false,
            "If set to 'true', abort() is not called in case of transient "
            "failures (i.e failures that are temporary and will likely go away "
            "on retrying; like a temporary connection failure) and an error "
            "message is printed instead. Note that this flag just controls "
            "whether abort() is called or not. It does not control whether the "
            "test is retried in case of transient failures (and currently the "
            "interop tests are not retried even if this flag is set to true)");
DEFINE_int32(soak_iterations, 1000,
             "The number of iterations to use for the two soak tests; rpc_soak "
             "and channel_soak.");
DEFINE_int32(soak_max_failures, 0,
             "The number of iterations in soak tests that are allowed to fail "
             "(either due to non-OK status code or exceeding the "
             "per-iteration max acceptable latency).");
DEFINE_int32(soak_per_iteration_max_acceptable_latency_ms, 0,
             "The number of milliseconds a single iteration in the two soak "
             "tests (rpc_soak and channel_soak) should take.");
DEFINE_int32(soak_overall_timeout_seconds, 0,
             "The overall number of seconds after which a soak test should "
             "stop and fail, if the desired number of iterations have not yet "
             "completed.");
DEFINE_int32(iteration_interval, 10,
             "The interval in seconds between rpcs. This is used by "
             "long_connection test");
DEFINE_string(additional_metadata, "",
              "Additional metadata to send in each request, as a "
              "semicolon-separated list of key:value pairs.");

using grpc::testing::CreateChannelForTestCase;
using grpc::testing::GetServiceAccountJsonKey;
using grpc::testing::UpdateActions;

namespace {

// Parse the contents of FLAGS_additional_metadata into a map. Allow
// alphanumeric characters and dashes in keys, and any character but semicolons
// in values. Convert keys to lowercase. On failure, log an error and return
// false.
bool ParseAdditionalMetadataFlag(
    const std::string& flag,
    std::multimap<std::string, std::string>* additional_metadata) {
  size_t start_pos = 0;
  while (start_pos < flag.length()) {
    size_t colon_pos = flag.find(':', start_pos);
    if (colon_pos == std::string::npos) {
      gpr_log(GPR_ERROR,
              "Couldn't parse metadata flag: extra characters at end of flag");
      return false;
    }
    size_t semicolon_pos = flag.find(';', colon_pos);

    std::string key = flag.substr(start_pos, colon_pos - start_pos);
    std::string value =
        flag.substr(colon_pos + 1, semicolon_pos - colon_pos - 1);

    constexpr char alphanum_and_hyphen[] =
        "-0123456789"
        "abcdefghijklmnopqrstuvwxyz"
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (key.find_first_not_of(alphanum_and_hyphen) != std::string::npos) {
      gpr_log(GPR_ERROR,
              "Couldn't parse metadata flag: key contains characters other "
              "than alphanumeric and hyphens: %s",
              key.c_str());
      return false;
    }

    // Convert to lowercase.
    for (char& c : key) {
      if (c >= 'A' && c <= 'Z') {
        c += ('a' - 'A');
      }
    }

    gpr_log(GPR_INFO, "Adding additional metadata with key %s and value %s",
            key.c_str(), value.c_str());
    additional_metadata->insert({key, value});

    if (semicolon_pos == std::string::npos) {
      break;
    } else {
      start_pos = semicolon_pos + 1;
    }
  }

  return true;
}

}  // namespace

int main(int argc, char** argv) {
  grpc::testing::TestEnvironment env(argc, argv);
  grpc::testing::InitTest(&argc, &argv, true);
  gpr_log(GPR_INFO, "Testing these cases: %s", FLAGS_test_case.c_str());
  int ret = 0;

  grpc::testing::ChannelCreationFunc channel_creation_func;
  std::string test_case = FLAGS_test_case;
  if (FLAGS_additional_metadata == "") {
    channel_creation_func = [test_case]() {
      return CreateChannelForTestCase(test_case);
    };
  } else {
    std::multimap<std::string, std::string> additional_metadata;
    if (!ParseAdditionalMetadataFlag(FLAGS_additional_metadata,
                                     &additional_metadata)) {
      return 1;
    }

    channel_creation_func = [test_case, additional_metadata]() {
      std::vector<std::unique_ptr<
          grpc::experimental::ClientInterceptorFactoryInterface>>
          factories;
      factories.emplace_back(
          new grpc::testing::AdditionalMetadataInterceptorFactory(
              additional_metadata));
      return CreateChannelForTestCase(test_case, std::move(factories));
    };
  }

  grpc::testing::InteropClient client(channel_creation_func, true,
                                      FLAGS_do_not_abort_on_transient_failures);

  std::unordered_map<std::string, std::function<bool()>> actions;
  actions["empty_unary"] =
      std::bind(&grpc::testing::InteropClient::DoEmpty, &client);
  actions["large_unary"] =
      std::bind(&grpc::testing::InteropClient::DoLargeUnary, &client);
  actions["server_compressed_unary"] = std::bind(
      &grpc::testing::InteropClient::DoServerCompressedUnary, &client);
  actions["client_compressed_unary"] = std::bind(
      &grpc::testing::InteropClient::DoClientCompressedUnary, &client);
  actions["client_streaming"] =
      std::bind(&grpc::testing::InteropClient::DoRequestStreaming, &client);
  actions["server_streaming"] =
      std::bind(&grpc::testing::InteropClient::DoResponseStreaming, &client);
  actions["server_compressed_streaming"] = std::bind(
      &grpc::testing::InteropClient::DoServerCompressedStreaming, &client);
  actions["client_compressed_streaming"] = std::bind(
      &grpc::testing::InteropClient::DoClientCompressedStreaming, &client);
  actions["slow_consumer"] = std::bind(
      &grpc::testing::InteropClient::DoResponseStreamingWithSlowConsumer,
      &client);
  actions["half_duplex"] =
      std::bind(&grpc::testing::InteropClient::DoHalfDuplex, &client);
  actions["ping_pong"] =
      std::bind(&grpc::testing::InteropClient::DoPingPong, &client);
  actions["cancel_after_begin"] =
      std::bind(&grpc::testing::InteropClient::DoCancelAfterBegin, &client);
  actions["cancel_after_first_response"] = std::bind(
      &grpc::testing::InteropClient::DoCancelAfterFirstResponse, &client);
  actions["timeout_on_sleeping_server"] = std::bind(
      &grpc::testing::InteropClient::DoTimeoutOnSleepingServer, &client);
  actions["empty_stream"] =
      std::bind(&grpc::testing::InteropClient::DoEmptyStream, &client);
  actions["pick_first_unary"] =
      std::bind(&grpc::testing::InteropClient::DoPickFirstUnary, &client);
  if (FLAGS_use_tls) {
    actions["compute_engine_creds"] =
        std::bind(&grpc::testing::InteropClient::DoComputeEngineCreds, &client,
                  FLAGS_default_service_account, FLAGS_oauth_scope);
    actions["jwt_token_creds"] =
        std::bind(&grpc::testing::InteropClient::DoJwtTokenCreds, &client,
                  GetServiceAccountJsonKey());
    actions["oauth2_auth_token"] =
        std::bind(&grpc::testing::InteropClient::DoOauth2AuthToken, &client,
                  FLAGS_default_service_account, FLAGS_oauth_scope);
    actions["per_rpc_creds"] =
        std::bind(&grpc::testing::InteropClient::DoPerRpcCreds, &client,
                  GetServiceAccountJsonKey());
  }
  if (FLAGS_custom_credentials_type == "google_default_credentials") {
    actions["google_default_credentials"] =
        std::bind(&grpc::testing::InteropClient::DoGoogleDefaultCredentials,
                  &client, FLAGS_default_service_account);
  }
  actions["status_code_and_message"] =
      std::bind(&grpc::testing::InteropClient::DoStatusWithMessage, &client);
  actions["custom_metadata"] =
      std::bind(&grpc::testing::InteropClient::DoCustomMetadata, &client);
  actions["unimplemented_method"] =
      std::bind(&grpc::testing::InteropClient::DoUnimplementedMethod, &client);
  actions["unimplemented_service"] =
      std::bind(&grpc::testing::InteropClient::DoUnimplementedService, &client);
  actions["cacheable_unary"] =
      std::bind(&grpc::testing::InteropClient::DoCacheableUnary, &client);
  actions["channel_soak"] =
      std::bind(&grpc::testing::InteropClient::DoChannelSoakTest, &client,
                FLAGS_soak_iterations, FLAGS_soak_max_failures,
                FLAGS_soak_per_iteration_max_acceptable_latency_ms,
                FLAGS_soak_overall_timeout_seconds);
  actions["rpc_soak"] =
      std::bind(&grpc::testing::InteropClient::DoRpcSoakTest, &client,
                FLAGS_soak_iterations, FLAGS_soak_max_failures,
                FLAGS_soak_per_iteration_max_acceptable_latency_ms,
                FLAGS_soak_overall_timeout_seconds);
  actions["long_lived_channel"] =
      std::bind(&grpc::testing::InteropClient::DoLongLivedChannelTest, &client,
                FLAGS_soak_iterations, FLAGS_iteration_interval);

  UpdateActions(&actions);

  if (FLAGS_test_case == "all") {
    for (const auto& action : actions) {
      action.second();
    }
  } else if (actions.find(FLAGS_test_case) != actions.end()) {
    actions.find(FLAGS_test_case)->second();
  } else {
    std::string test_cases;
    for (const auto& action : actions) {
      if (!test_cases.empty()) test_cases += "\n";
      test_cases += action.first;
    }
    gpr_log(GPR_ERROR, "Unsupported test case %s. Valid options are\n%s",
            FLAGS_test_case.c_str(), test_cases.c_str());
    ret = 1;
  }

  return ret;
}
