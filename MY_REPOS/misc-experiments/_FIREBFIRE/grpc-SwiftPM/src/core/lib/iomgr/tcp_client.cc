/*
 *
 * Copyright 2018 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
orm.h>

#include "src/core/lib/iomgr/tcp_client.h"

grpc_tcp_client_vtable* grpc_tcp_client_impl;

void grpc_tcp_client_connect(grpc_closure* closure, grpc_endpoint** ep,
                             grpc_pollset_set* interested_parties,
                             const grpc_channel_args* channel_args,
                             const grpc_resolved_address* addr,
                             grpc_millis deadline) {
  grpc_tcp_client_impl->connect(closure, ep, interested_parties, channel_args,
                                addr, deadline);
}

void grpc_set_tcp_client_impl(grpc_tcp_client_vtable* impl) {
  grpc_tcp_client_impl = impl;
}
