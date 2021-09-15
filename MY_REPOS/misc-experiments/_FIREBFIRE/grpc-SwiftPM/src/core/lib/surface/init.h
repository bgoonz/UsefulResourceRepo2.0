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
T_H
#define GRPC_CORE_LIB_SURFACE_INIT_H

void grpc_register_security_filters(void);
void grpc_security_pre_init(void);
void grpc_security_init(void);
void grpc_maybe_wait_for_async_shutdown(void);

#endif /* GRPC_CORE_LIB_SURFACE_INIT_H */
