/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

#include <assert.h>

namespace firebase {
namespace internal {

bool FunctionRegistry::RegisterFunction(
    FunctionId id, RegisteredFunction registered_function) {
  MutexLock lock(map_mutex_);
  auto itr = registered_functions_.find(id);
  if (itr != registered_functions_.end()) {
    return false;
  } else {
    registered_functions_[id] = registered_function;
    return true;
  }
}

bool FunctionRegistry::UnregisterFunction(FunctionId id) {
  MutexLock lock(map_mutex_);
  auto itr = registered_functions_.find(id);
  if (itr == registered_functions_.end()) {
    return false;
  } else {
    registered_functions_.erase(itr, itr);
    return true;
  }
}

bool FunctionRegistry::FunctionExists(FunctionId id) {
  MutexLock lock(map_mutex_);
  auto itr = registered_functions_.find(id);
  return itr != registered_functions_.end();
}

bool FunctionRegistry::CallFunction(FunctionId id, App* app, void* args,
                                    void* out) {
  RegisteredFunction function;
  {
    std::map<FunctionId, RegisteredFunction>::iterator itr;
    MutexLock lock(map_mutex_);
    itr = registered_functions_.find(id);
    if (itr != registered_functions_.end()) {
      function = itr->second;
    } else {
      return false;
    }
  }
  return function(app, args, out);
}

}  // namespace internal
// NOLINTNEXTLINE - allow namespace overridden
}  // namespace firebase
