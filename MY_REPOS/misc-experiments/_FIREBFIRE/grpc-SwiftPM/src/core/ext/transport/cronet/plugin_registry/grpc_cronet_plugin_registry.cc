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

#include <grpc/grpc.h>

void grpc_http_filters_init(void);
void grpc_http_filters_shutdown(void);
void grpc_chttp2_plugin_init(void);
void grpc_chttp2_plugin_shutdown(void);
void grpc_deadline_filter_init(void);
void grpc_deadline_filter_shutdown(void);
void grpc_client_channel_init(void);
void grpc_client_channel_shutdown(void);

void grpc_register_built_in_plugins(void) {
  grpc_register_plugin(grpc_http_filters_init, grpc_http_filters_shutdown);
  grpc_register_plugin(grpc_chttp2_plugin_init, grpc_chttp2_plugin_shutdown);
  grpc_register_plugin(grpc_deadline_filter_init,
                       grpc_deadline_filter_shutdown);
  grpc_register_plugin(grpc_client_channel_init, grpc_client_channel_shutdown);
}
