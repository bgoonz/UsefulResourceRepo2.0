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
#if GRPC_ARES == 1 && defined(GRPC_UV)

#include <grpc/support/string_util.h>

#include "src/core/ext/filters/client_channel/parse_address.h"
#include "src/core/ext/filters/client_channel/resolver/dns/c_ares/grpc_ares_wrapper.h"
#include "src/core/ext/filters/client_channel/server_address.h"
#include "src/core/lib/gpr/string.h"

bool grpc_ares_query_ipv6() {
  /* The libuv grpc code currently does not have the code to probe for this,
   * so we assume for now that IPv6 is always available in contexts where this
   * code will be used. */
  return true;
}

#endif /* GRPC_ARES == 1 && defined(GRPC_UV) */
