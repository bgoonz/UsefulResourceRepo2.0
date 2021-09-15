/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

#include "app/src/include/firebase/internal/type_traits.h"
#include "gmock/gmock.h"
#include "gtest/gtest.h"

namespace firebase {
namespace {

using ::testing::Eq;

class MoveTester {
 public:
  MoveTester() = default;
  MoveTester(const MoveTester&) = default;
  MoveTester(MoveTester&& other) : moved_(true) {}
  MoveTester& operator=(MoveTester&& other) {
    moved_ = true;
    return *this;
  }
  bool moved() const { return moved_; }

 private:
  bool moved_ = false;
};

TEST(MoveTest, DefaultConstructedMoveTesterIsNotMoved) {
  MoveTester tester;
  ASSERT_THAT(tester.moved(), Eq(false));
}

TEST(MoveTest, CopyConstructedMoveTesterIsNotMoved) {
  MoveTester tester;
  MoveTester copiedTester(tester);
  ASSERT_THAT(copiedTester.moved(), Eq(false));
}

TEST(MoveTest, MoveConstructedMoveTesterIsMoved) {
  MoveTester tester;
  MoveTester copiedTester(Move(tester));
  ASSERT_THAT(copiedTester.moved(), Eq(true));
}

TEST(MoveTest, MoveAssignedMoveTesterIsMoved) {
  MoveTester tester1;
  MoveTester tester2;
  tester2 = Move(tester1);
  ASSERT_THAT(tester2.moved(), Eq(true));
}

}  // namespace
}  // namespace firebase
