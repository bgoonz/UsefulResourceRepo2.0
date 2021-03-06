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
etadata.cc */

#include <stdio.h>
#include <string.h>

static unsigned char legal_bits[256 / 8];

static void legal(int x) {
  int byte = x / 8;
  int bit = x % 8;
  /* NB: the following integer arithmetic operation needs to be in its
   * expanded form due to the "integral promotion" performed (see section
   * 3.2.1.1 of the C89 draft standard). A cast to the smaller container type
   * is then required to avoid the compiler warning */
  legal_bits[byte] =
      (unsigned char)((legal_bits[byte] | (unsigned char)(1 << bit)));
}

static void dump(const char *name) {
  int i;

  printf("const uint8_t %s[256/8] = ", name);
  for (i = 0; i < 256 / 8; i++)
    printf("%c 0x%02x", i ? ',' : '{', legal_bits[i]);
  printf(" };\n");
}

static void clear(void) { memset(legal_bits, 0, sizeof(legal_bits)); }

int main(void) {
  int i;

  clear();
  for (i = 'a'; i <= 'z'; i++) legal(i);
  for (i = 'A'; i <= 'Z'; i++) legal(i);
  for (i = '0'; i <= '9'; i++) legal(i);
  legal('-');
  legal('_');
  legal('.');
  legal('~');
  dump("grpc_url_percent_encoding_unreserved_bytes");

  clear();
  for (i = 32; i <= 126; i++) {
    if (i == '%') continue;
    legal(i);
  }
  dump("grpc_compatible_percent_encoding_unreserved_bytes");

  return 0;
}
