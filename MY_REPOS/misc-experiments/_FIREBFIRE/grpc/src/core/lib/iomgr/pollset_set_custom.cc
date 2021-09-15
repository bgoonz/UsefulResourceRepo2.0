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
orm.h>

#include "src/core/lib/iomgr/port.h"

#include "src/core/lib/iomgr/pollset_set.h"

static grpc_pollset_set* pollset_set_create(void) {
  return (grpc_pollset_set*)((intptr_t)0xdeafbeef);
}

static void pollset_set_destroy(grpc_pollset_set* /*pollset_set*/) {}

static void pollset_set_add_pollset(grpc_pollset_set* /*pollset_set*/,
                                    grpc_pollset* /*pollset*/) {}

static void pollset_set_del_pollset(grpc_pollset_set* /*pollset_set*/,
                                    grpc_pollset* /*pollset*/) {}

static void pollset_set_add_pollset_set(grpc_pollset_set* /*bag*/,
                                        grpc_pollset_set* /*item*/) {}

static void pollset_set_del_pollset_set(grpc_pollset_set* /*bag*/,
                                        grpc_pollset_set* /*item*/) {}

static grpc_pollset_set_vtable vtable = {
    pollset_set_create,          pollset_set_destroy,
    pollset_set_add_pollset,     pollset_set_del_pollset,
    pollset_set_add_pollset_set, pollset_set_del_pollset_set};

void grpc_custom_pollset_set_init() { grpc_set_pollset_set_vtable(&vtable); }
