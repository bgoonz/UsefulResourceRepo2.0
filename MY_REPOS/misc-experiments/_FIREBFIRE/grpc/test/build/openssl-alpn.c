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
t, to see if we have a version of OpenSSL with
   ALPN support installed. */

#include <stdlib.h>
#include <openssl/ssl.h>

int main() {
  SSL_get0_alpn_selected(NULL, NULL, NULL);
  return 0;
}
