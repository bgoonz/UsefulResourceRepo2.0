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

#define TEST_QPS_USAGE_TIMER_H

class UsageTimer {
 public:
  UsageTimer();

  struct Result {
    double wall;
    double user;
    double system;
    unsigned long long total_cpu_time;
    unsigned long long idle_cpu_time;
  };

  Result Mark() const;

  static double Now();

 private:
  static Result Sample();

  const Result start_;
};

#endif  // TEST_QPS_TIMER_H
