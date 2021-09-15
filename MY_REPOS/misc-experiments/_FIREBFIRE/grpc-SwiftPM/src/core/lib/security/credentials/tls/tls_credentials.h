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
EDENTIALS_TLS_TLS_CREDENTIALS_H
#define GRPC_CORE_LIB_SECURITY_CREDENTIALS_TLS_TLS_CREDENTIALS_H

#include <grpc/support/port_platform.h>

#include <grpc/grpc_security.h>

#include "src/core/lib/security/credentials/credentials.h"
#include "src/core/lib/security/credentials/tls/grpc_tls_credentials_options.h"

class TlsCredentials final : public grpc_channel_credentials {
 public:
  explicit TlsCredentials(
      grpc_core::RefCountedPtr<grpc_tls_credentials_options> options);
  ~TlsCredentials() override;

  grpc_core::RefCountedPtr<grpc_channel_security_connector>
  create_security_connector(
      grpc_core::RefCountedPtr<grpc_call_credentials> call_creds,
      const char* target_name, const grpc_channel_args* args,
      grpc_channel_args** new_args) override;

  const grpc_tls_credentials_options& options() const { return *options_; }

 private:
  grpc_core::RefCountedPtr<grpc_tls_credentials_options> options_;
};

class TlsServerCredentials final : public grpc_server_credentials {
 public:
  explicit TlsServerCredentials(
      grpc_core::RefCountedPtr<grpc_tls_credentials_options> options);
  ~TlsServerCredentials() override;

  grpc_core::RefCountedPtr<grpc_server_security_connector>
  create_security_connector() override;

  const grpc_tls_credentials_options& options() const { return *options_; }

 private:
  grpc_core::RefCountedPtr<grpc_tls_credentials_options> options_;
};

#endif /* GRPC_CORE_LIB_SECURITY_CREDENTIALS_TLS_TLS_CREDENTIALS_H */
