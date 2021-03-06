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

#define GRPCPP_TEST_MOCK_STREAM_H

#include <stdint.h>

#include <gmock/gmock.h>
#include <grpcpp/impl/codegen/call.h>
#include <grpcpp/support/async_stream.h>
#include <grpcpp/support/async_unary_call.h>
#include <grpcpp/support/sync_stream.h>

namespace grpc {
namespace testing {

template <class R>
class MockClientReader : public ::grpc_impl::ClientReaderInterface<R> {
 public:
  MockClientReader() = default;

  /// ClientStreamingInterface
  MOCK_METHOD0_T(Finish, Status());

  /// ReaderInterface
  MOCK_METHOD1_T(NextMessageSize, bool(uint32_t*));
  MOCK_METHOD1_T(Read, bool(R*));

  /// ClientReaderInterface
  MOCK_METHOD0_T(WaitForInitialMetadata, void());
};

template <class W>
class MockClientWriter : public ::grpc_impl::ClientWriterInterface<W> {
 public:
  MockClientWriter() = default;

  /// ClientStreamingInterface
  MOCK_METHOD0_T(Finish, Status());

  /// WriterInterface
  MOCK_METHOD2_T(Write, bool(const W&, const WriteOptions));

  /// ClientWriterInterface
  MOCK_METHOD0_T(WritesDone, bool());
};

template <class W, class R>
class MockClientReaderWriter
    : public ::grpc_impl::ClientReaderWriterInterface<W, R> {
 public:
  MockClientReaderWriter() = default;

  /// ClientStreamingInterface
  MOCK_METHOD0_T(Finish, Status());

  /// ReaderInterface
  MOCK_METHOD1_T(NextMessageSize, bool(uint32_t*));
  MOCK_METHOD1_T(Read, bool(R*));

  /// WriterInterface
  MOCK_METHOD2_T(Write, bool(const W&, const WriteOptions));

  /// ClientReaderWriterInterface
  MOCK_METHOD0_T(WaitForInitialMetadata, void());
  MOCK_METHOD0_T(WritesDone, bool());
};

/// TODO: We do not support mocking an async RPC for now.

template <class R>
class MockClientAsyncResponseReader
    : public ::grpc_impl::ClientAsyncResponseReaderInterface<R> {
 public:
  MockClientAsyncResponseReader() = default;

  MOCK_METHOD1_T(ReadInitialMetadata, void(void*));
  MOCK_METHOD3_T(Finish, void(R*, Status*, void*));
};

template <class R>
class MockClientAsyncReader : public ClientAsyncReaderInterface<R> {
 public:
  MockClientAsyncReader() = default;

  /// ClientAsyncStreamingInterface
  MOCK_METHOD1_T(ReadInitialMetadata, void(void*));
  MOCK_METHOD2_T(Finish, void(Status*, void*));

  /// AsyncReaderInterface
  MOCK_METHOD2_T(Read, void(R*, void*));
};

template <class W>
class MockClientAsyncWriter
    : public ::grpc_impl::ClientAsyncWriterInterface<W> {
 public:
  MockClientAsyncWriter() = default;

  /// ClientAsyncStreamingInterface
  MOCK_METHOD1_T(ReadInitialMetadata, void(void*));
  MOCK_METHOD2_T(Finish, void(Status*, void*));

  /// AsyncWriterInterface
  MOCK_METHOD2_T(Write, void(const W&, void*));

  /// ClientAsyncWriterInterface
  MOCK_METHOD1_T(WritesDone, void(void*));
};

template <class W, class R>
class MockClientAsyncReaderWriter
    : public ClientAsyncReaderWriterInterface<W, R> {
 public:
  MockClientAsyncReaderWriter() = default;

  /// ClientAsyncStreamingInterface
  MOCK_METHOD1_T(ReadInitialMetadata, void(void*));
  MOCK_METHOD2_T(Finish, void(Status*, void*));

  /// AsyncWriterInterface
  MOCK_METHOD2_T(Write, void(const W&, void*));

  /// AsyncReaderInterface
  MOCK_METHOD2_T(Read, void(R*, void*));

  /// ClientAsyncReaderWriterInterface
  MOCK_METHOD1_T(WritesDone, void(void*));
};

}  // namespace testing
}  // namespace grpc

#endif  // GRPCPP_TEST_MOCK_STREAM_H
