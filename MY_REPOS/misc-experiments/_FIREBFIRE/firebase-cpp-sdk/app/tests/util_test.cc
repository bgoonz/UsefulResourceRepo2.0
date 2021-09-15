/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

#include "gmock/gmock.h"
#include "gtest/gtest.h"

namespace firebase {
namespace {

using ::testing::ElementsAre;
using ::testing::IsEmpty;

TEST(UtilTest, SplitStringRegularCase) {
  EXPECT_THAT(SplitString("a/b/c", '/'), ElementsAre("a", "b", "c"));
}

TEST(UtilTest, SplitStringNoDelimeters) {
  EXPECT_THAT(SplitString("a", '/'), ElementsAre("a"));
}

TEST(UtilTest, SplitStringTrailingDelimeter) {
  EXPECT_THAT(SplitString("a/b/c/", '/'), ElementsAre("a", "b", "c"));
}

TEST(UtilTest, SplitStringLeadingDelimeter) {
  EXPECT_THAT(SplitString("/a/b/c", '/'), ElementsAre("a", "b", "c"));
}

TEST(UtilTest, SplitStringConsecutiveDelimeters) {
  EXPECT_THAT(SplitString("a///b/c", '/'), ElementsAre("a", "b", "c"));
  EXPECT_THAT(SplitString("///a///b///c///", '/'), ElementsAre("a", "b", "c"));
}

TEST(UtilTest, SplitStringEmptyString) {
  EXPECT_THAT(SplitString("", '/'), IsEmpty());
}

TEST(UtilTest, SplitStringDelimetersOnly) {
  EXPECT_THAT(SplitString("///", '/'), IsEmpty());
}

}  // namespace
}  // namespace firebase
