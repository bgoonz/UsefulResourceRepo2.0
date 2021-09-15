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

#include "src/core/lib/iomgr/pollset_set.h"

grpc_pollset_set_vtable* grpc_pollset_set_impl;

void grpc_set_pollset_set_vtable(grpc_pollset_set_vtable* vtable) {
  grpc_pollset_set_impl = vtable;
}

grpc_pollset_set* grpc_pollset_set_create() {
  return grpc_pollset_set_impl->create();
}

void grpc_pollset_set_destroy(grpc_pollset_set* pollset_set) {
  grpc_pollset_set_impl->destroy(pollset_set);
}

void grpc_pollset_set_add_pollset(grpc_pollset_set* pollset_set,
                                  grpc_pollset* pollset) {
  grpc_pollset_set_impl->add_pollset(pollset_set, pollset);
}

void grpc_pollset_set_del_pollset(grpc_pollset_set* pollset_set,
                                  grpc_pollset* pollset) {
  grpc_pollset_set_impl->del_pollset(pollset_set, pollset);
}

void grpc_pollset_set_add_pollset_set(grpc_pollset_set* bag,
                                      grpc_pollset_set* item) {
  grpc_pollset_set_impl->add_pollset_set(bag, item);
}

void grpc_pollset_set_del_pollset_set(grpc_pollset_set* bag,
                                      grpc_pollset_set* item) {
  grpc_pollset_set_impl->del_pollset_set(bag, item);
}
