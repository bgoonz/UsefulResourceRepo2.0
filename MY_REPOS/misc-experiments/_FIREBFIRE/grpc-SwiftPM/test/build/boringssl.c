/*
 *
 * Copyright 2016 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
to compile

#include <stdio.h>
#include <unistd.h>

// boringssl uses anonymous unions
struct foo {
  union {
    int a;
    int b;
  };
};

int main(void) {
  const char *close = "this should not shadow";
  printf("%s\n", close);
  return 0;
}
