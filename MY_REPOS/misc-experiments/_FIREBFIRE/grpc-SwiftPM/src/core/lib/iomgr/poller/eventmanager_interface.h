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
R_EVENTMANAGER_INTERFACE_H
#define GRPC_CORE_LIB_IOMGR_POLLER_EVENTMANAGER_INTERFACE_H

namespace grpc {
namespace experimental {

class BaseEventManagerInterface {
 public:
  virtual ~BaseEventManagerInterface() {}
};

class EpollEventManagerInterface : public BaseEventManagerInterface {};

}  // namespace experimental
}  // namespace grpc

#endif /* GRPC_CORE_LIB_IOMGR_POLLER_EVENTMANAGER_INTERFACE_H */
