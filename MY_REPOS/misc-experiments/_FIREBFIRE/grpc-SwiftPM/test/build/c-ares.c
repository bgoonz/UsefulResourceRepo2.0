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


#if (ARES_VERSION < 0x010b00)
  ARES_VERSION should not be smaller than 1.11.0
#endif

int main(void) {
  ares_channel channelptr;

  ares_init(&channelptr);
  ares_destroy(channelptr);

  return 0;
}
