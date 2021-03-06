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

#include <string.h>

#include <string>

#include "absl/strings/str_cat.h"

#include <grpc/support/alloc.h>

#include "src/core/lib/gprpp/host_port.h"
#include "test/core/util/port.h"
#include "test/core/util/subprocess.h"

int main(int /*argc*/, const char** argv) {
  const char* me = argv[0];
  const char* lslash = strrchr(me, '/');
  char root[1024];
  int port = grpc_pick_unused_port_or_die();
  char* args[10];
  int status;
  gpr_subprocess *svr, *cli;
  /* figure out where we are */
  if (lslash) {
    memcpy(root, me, static_cast<size_t>(lslash - me));
    root[lslash - me] = 0;
  } else {
    strcpy(root, ".");
  }
  /* start the server */
  std::string command =
      absl::StrCat(root, "/fling_server", gpr_subprocess_binary_extension());
  args[0] = const_cast<char*>(command.c_str());
  args[1] = const_cast<char*>("--bind");
  std::string joined = grpc_core::JoinHostPort("::", port);
  args[2] = const_cast<char*>(joined.c_str());
  args[3] = const_cast<char*>("--no-secure");
  svr = gpr_subprocess_create(4, (const char**)args);

  /* start the client */
  command =
      absl::StrCat(root, "/fling_client", gpr_subprocess_binary_extension());
  args[0] = const_cast<char*>(command.c_str());
  args[1] = const_cast<char*>("--target");
  joined = grpc_core::JoinHostPort("127.0.0.1", port);
  args[2] = const_cast<char*>(joined.c_str());
  args[3] = const_cast<char*>("--scenario=ping-pong-request");
  args[4] = const_cast<char*>("--no-secure");
  args[5] = nullptr;
  cli = gpr_subprocess_create(6, (const char**)args);

  /* wait for completion */
  printf("waiting for client\n");
  if ((status = gpr_subprocess_join(cli))) {
    gpr_subprocess_destroy(cli);
    gpr_subprocess_destroy(svr);
    return status;
  }
  gpr_subprocess_destroy(cli);

  gpr_subprocess_interrupt(svr);
  status = gpr_subprocess_join(svr);
  gpr_subprocess_destroy(svr);
  return status;
}
