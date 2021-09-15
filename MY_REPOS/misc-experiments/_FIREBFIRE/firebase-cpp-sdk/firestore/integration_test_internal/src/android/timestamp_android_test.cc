/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

#include "firebase/firestore/timestamp.h"
#include "firestore/src/jni/env.h"
#include "firestore_integration_test.h"
#include "gtest/gtest.h"

namespace firebase {
namespace firestore {
namespace {

using jni::Env;

using TimestampTest = FirestoreIntegrationTest;

TEST_F(TimestampTest, Converts) {
  Env env;

  Timestamp timestamp{1234, 5678};
  auto java_timestamp = TimestampInternal::Create(env, timestamp);
  EXPECT_EQ(timestamp, java_timestamp.ToPublic(env));
}

}  // namespace
}  // namespace firestore
}  // namespace firebase
