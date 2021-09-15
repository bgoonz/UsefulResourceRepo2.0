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


grpc_completion_queue *completion_queue;

void grpc_php_init_completion_queue(TSRMLS_D) {
  completion_queue = grpc_completion_queue_create_for_pluck(NULL);
}

void grpc_php_shutdown_completion_queue(TSRMLS_D) {
  grpc_completion_queue_shutdown(completion_queue);
  grpc_completion_queue_destroy(completion_queue);
}
