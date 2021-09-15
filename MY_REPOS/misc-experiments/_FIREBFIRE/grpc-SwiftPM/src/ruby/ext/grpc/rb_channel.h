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

#define GRPC_RB_CHANNEL_H_

#include <ruby/ruby.h>

#include <grpc/grpc.h>

/* Initializes the Channel class. */
void Init_grpc_channel();

void grpc_rb_channel_polling_thread_start();

/* Gets the wrapped channel from the ruby wrapper */
grpc_channel* grpc_rb_get_wrapped_channel(VALUE v);

#endif /* GRPC_RB_CHANNEL_H_ */
