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
t, to see if we have zlib installed. */

#include <stdlib.h>
#include <zlib.h>

int main() {
  deflateInit(Z_NULL, Z_DEFAULT_COMPRESSION);
  return 0;
}
