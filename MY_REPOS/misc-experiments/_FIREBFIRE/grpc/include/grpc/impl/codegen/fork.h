/*
 *
 * Copyright 2017 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *

#define GRPC_IMPL_CODEGEN_FORK_H

/**
 * gRPC applications should call this before calling fork().  There should be no
 * active gRPC function calls between calling grpc_prefork() and
 * grpc_postfork_parent()/grpc_postfork_child().
 *
 *
 * Typical use:
 * grpc_prefork();
 * int pid = fork();
 * if (pid) {
 *  grpc_postfork_parent();
 *  // Parent process..
 * } else {
 *  grpc_postfork_child();
 *  // Child process...
 * }
 */

void grpc_prefork(void);

void grpc_postfork_parent(void);

void grpc_postfork_child(void);

void grpc_fork_handlers_auto_register(void);

#endif /* GRPC_IMPL_CODEGEN_FORK_H */
