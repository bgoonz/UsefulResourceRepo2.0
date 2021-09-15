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
CREDENTIALS_H_
#define NET_GRPC_PHP_GRPC_SERVER_CREDENTIALS_H_

#include "php_grpc.h"

#include <grpc/grpc_security.h>

/* Class entry for the Server_Credentials PHP class */
extern zend_class_entry *grpc_ce_server_credentials;

/* Wrapper struct for grpc_server_credentials that can be associated with a PHP
 * object */
PHP_GRPC_WRAP_OBJECT_START(wrapped_grpc_server_credentials)
  grpc_server_credentials *wrapped;
PHP_GRPC_WRAP_OBJECT_END(wrapped_grpc_server_credentials)

static inline wrapped_grpc_server_credentials
*wrapped_grpc_server_credentials_from_obj(zend_object *obj) {
  return (wrapped_grpc_server_credentials*)(
      (char*)(obj) - XtOffsetOf(wrapped_grpc_server_credentials, std));
}

/* Initializes the Server_Credentials PHP class */
void grpc_init_server_credentials(TSRMLS_D);

#endif /* NET_GRPC_PHP_GRPC_SERVER_CREDENTIALS_H_ */
