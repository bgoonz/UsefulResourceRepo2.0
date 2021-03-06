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
iOS by default and disabled by default on other
/// platforms (see port_platform.h). To enable CFStream build on another
/// platform, the users need to define macro "GRPC_CFSTREAM=1" when building
/// gRPC.
///
/// When CFStream is to be built (either by default on iOS or by macro on other
/// platforms), the users can disable CFStream with environment variable
/// "grpc_cfstream=0". This will let gRPC to fallback to use POSIX sockets. In
/// addition, the users may choose to use an alternative CFRunLoop based pollset
/// "ev_apple" by setting environment variable "GRPC_CFSTREAM_RUN_LOOP=1". This
/// pollset resolves a bug from Apple when CFStream streams dispatch events to
/// dispatch queues. The caveat of this pollset is that users may not be able to
/// run a gRPC server in the same process.

#include <grpc/support/port_platform.h>

#include "src/core/lib/iomgr/port.h"

#ifdef GRPC_CFSTREAM_IOMGR

#include "src/core/lib/debug/trace.h"
#include "src/core/lib/iomgr/ev_apple.h"
#include "src/core/lib/iomgr/ev_posix.h"
#include "src/core/lib/iomgr/iomgr_internal.h"
#include "src/core/lib/iomgr/iomgr_posix.h"
#include "src/core/lib/iomgr/resolve_address.h"
#include "src/core/lib/iomgr/tcp_client.h"
#include "src/core/lib/iomgr/tcp_posix.h"
#include "src/core/lib/iomgr/tcp_server.h"
#include "src/core/lib/iomgr/timer.h"

static const char* grpc_cfstream_env_var = "grpc_cfstream";
static const char* grpc_cfstream_run_loop_env_var = "GRPC_CFSTREAM_RUN_LOOP";

extern grpc_tcp_server_vtable grpc_posix_tcp_server_vtable;
extern grpc_tcp_client_vtable grpc_posix_tcp_client_vtable;
extern grpc_tcp_client_vtable grpc_cfstream_client_vtable;
extern grpc_timer_vtable grpc_generic_timer_vtable;
extern grpc_pollset_vtable grpc_posix_pollset_vtable;
extern grpc_pollset_set_vtable grpc_posix_pollset_set_vtable;
extern grpc_address_resolver_vtable grpc_posix_resolver_vtable;

static void apple_iomgr_platform_init(void) { grpc_pollset_global_init(); }

static void apple_iomgr_platform_flush(void) {}

static void apple_iomgr_platform_shutdown(void) {
  grpc_pollset_global_shutdown();
}

static void apple_iomgr_platform_shutdown_background_closure(void) {}

static bool apple_iomgr_platform_is_any_background_poller_thread(void) {
  return false;
}

static bool apple_iomgr_platform_add_closure_to_background_poller(
    grpc_closure* closure, grpc_error* error) {
  return false;
}

static grpc_iomgr_platform_vtable apple_vtable = {
    apple_iomgr_platform_init,
    apple_iomgr_platform_flush,
    apple_iomgr_platform_shutdown,
    apple_iomgr_platform_shutdown_background_closure,
    apple_iomgr_platform_is_any_background_poller_thread,
    apple_iomgr_platform_add_closure_to_background_poller};

static void iomgr_platform_init(void) {
  grpc_wakeup_fd_global_init();
  grpc_event_engine_init();
}

static void iomgr_platform_flush(void) {}

static void iomgr_platform_shutdown(void) {
  grpc_event_engine_shutdown();
  grpc_wakeup_fd_global_destroy();
}

static void iomgr_platform_shutdown_background_closure(void) {
  grpc_shutdown_background_closure();
}

static bool iomgr_platform_is_any_background_poller_thread(void) {
  return grpc_is_any_background_poller_thread();
}

static bool iomgr_platform_add_closure_to_background_poller(
    grpc_closure* closure, grpc_error* error) {
  return grpc_add_closure_to_background_poller(closure, error);
}

static grpc_iomgr_platform_vtable vtable = {
    iomgr_platform_init,
    iomgr_platform_flush,
    iomgr_platform_shutdown,
    iomgr_platform_shutdown_background_closure,
    iomgr_platform_is_any_background_poller_thread,
    iomgr_platform_add_closure_to_background_poller};

void grpc_set_default_iomgr_platform() {
  char* enable_cfstream_str = getenv(grpc_cfstream_env_var);
  bool enable_cfstream =
      enable_cfstream_str == nullptr || enable_cfstream_str[0] != '0';
  char* enable_cfstream_run_loop_str = getenv(grpc_cfstream_run_loop_env_var);
  // CFStream run-loop is disabled by default. The user has to enable it
  // explicitly with environment variable.
  bool enable_cfstream_run_loop = enable_cfstream_run_loop_str != nullptr &&
                                  enable_cfstream_run_loop_str[0] == '1';
  if (!enable_cfstream) {
    // Use POSIX sockets for both client and server
    grpc_set_tcp_client_impl(&grpc_posix_tcp_client_vtable);
    grpc_set_tcp_server_impl(&grpc_posix_tcp_server_vtable);
    grpc_set_pollset_vtable(&grpc_posix_pollset_vtable);
    grpc_set_pollset_set_vtable(&grpc_posix_pollset_set_vtable);
    grpc_set_iomgr_platform_vtable(&vtable);
  } else if (enable_cfstream && !enable_cfstream_run_loop) {
    // Use CFStream with dispatch queue for client; use POSIX sockets for server
    grpc_set_tcp_client_impl(&grpc_cfstream_client_vtable);
    grpc_set_tcp_server_impl(&grpc_posix_tcp_server_vtable);
    grpc_set_pollset_vtable(&grpc_posix_pollset_vtable);
    grpc_set_pollset_set_vtable(&grpc_posix_pollset_set_vtable);
    grpc_set_iomgr_platform_vtable(&vtable);
  } else {
    // Use CFStream with CFRunLoop for client; server not supported
    grpc_set_tcp_client_impl(&grpc_cfstream_client_vtable);
    grpc_set_pollset_vtable(&grpc_apple_pollset_vtable);
    grpc_set_pollset_set_vtable(&grpc_apple_pollset_set_vtable);
    grpc_set_iomgr_platform_vtable(&apple_vtable);
  }
  grpc_set_timer_impl(&grpc_generic_timer_vtable);
  grpc_set_resolver_impl(&grpc_posix_resolver_vtable);
}

bool grpc_iomgr_run_in_background() {
  char* enable_cfstream_str = getenv(grpc_cfstream_env_var);
  bool enable_cfstream =
      enable_cfstream_str == nullptr || enable_cfstream_str[0] != '0';
  char* enable_cfstream_run_loop_str = getenv(grpc_cfstream_run_loop_env_var);
  // CFStream run-loop is disabled by default. The user has to enable it
  // explicitly with environment variable.
  bool enable_cfstream_run_loop = enable_cfstream_run_loop_str != nullptr &&
                                  enable_cfstream_run_loop_str[0] == '1';
  if (enable_cfstream && enable_cfstream_run_loop) {
    return false;
  } else {
    return grpc_event_engine_run_in_background();
  }
}

#endif /* GRPC_CFSTREAM_IOMGR */
