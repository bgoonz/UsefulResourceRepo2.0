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
ENT_CHANNEL_XDS_XDS_CHANNEL_H
#define GRPC_CORE_EXT_FILTERS_CLIENT_CHANNEL_XDS_XDS_CHANNEL_H

#include <grpc/support/port_platform.h>

#include <grpc/impl/codegen/grpc_types.h>

#include "src/core/ext/filters/client_channel/xds/xds_bootstrap.h"
#include "src/core/lib/iomgr/error.h"

namespace grpc_core {

/// Makes any necessary modifications to \a args for use in the xds
/// balancer channel.
///
/// Takes ownership of \a args.
///
/// Caller takes ownership of the returned args.
grpc_channel_args* ModifyXdsChannelArgs(grpc_channel_args* args);

grpc_channel* CreateXdsChannel(const XdsBootstrap& bootstrap,
                               const grpc_channel_args& args,
                               grpc_error** error);

}  // namespace grpc_core

#endif /* GRPC_CORE_EXT_FILTERS_CLIENT_CHANNEL_XDS_XDS_CHANNEL_H \
        */
