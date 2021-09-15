/*
 *
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
orm.h>

#include "src/core/lib/security/security_connector/ssl_utils_config.h"

/** Config variable that points to the default SSL roots file. This file
    must be a PEM encoded file with all the roots such as the one that can be
    downloaded from https://pki.google.com/roots.pem. */
GPR_GLOBAL_CONFIG_DEFINE_STRING(grpc_default_ssl_roots_file_path, "",
                                "Path to the default SSL roots file.");

/** Config variable used as a flag to enable/disable loading system root
    certificates from the OS trust store. */
GPR_GLOBAL_CONFIG_DEFINE_BOOL(grpc_not_use_system_ssl_roots, false,
                              "Disable loading system root certificates.");
