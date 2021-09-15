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
IST_H
#define GRPC_SUPPORT_WORKAROUND_LIST_H

/* The list of IDs of server workarounds currently maintained by gRPC. For
 * explanation and detailed descriptions of workarounds, see
 * /doc/workarounds.md
 */
typedef enum {
  GRPC_WORKAROUND_ID_CRONET_COMPRESSION = 0,
  GRPC_MAX_WORKAROUND_ID
} grpc_workaround_list;

#endif /* GRPC_SUPPORT_WORKAROUND_LIST_H */
