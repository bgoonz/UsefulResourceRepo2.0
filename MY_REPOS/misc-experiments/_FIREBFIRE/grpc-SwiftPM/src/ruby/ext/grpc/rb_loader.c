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
ed.h"

#if GPR_WINDOWS
#include <tchar.h>

int grpc_rb_load_core() {
#if GPR_ARCH_64
  TCHAR fname[] = _T("grpc_c.64.ruby");
#else
  TCHAR fname[] = _T("grpc_c.32.ruby");
#endif
  HMODULE module = GetModuleHandle(_T("grpc_c.so"));
  TCHAR path[2048 + 32] = _T("");
  LPTSTR seek_back = NULL;
  GetModuleFileName(module, path, 2048);

  seek_back = _tcsrchr(path, _T('\\'));

  while (seek_back) {
    HMODULE grpc_c;
    _tcscpy(seek_back + 1, fname);
    grpc_c = LoadLibrary(path);
    if (grpc_c) {
      grpc_rb_load_imports(grpc_c);
      return 1;
    } else {
      *seek_back = _T('\0');
      seek_back = _tcsrchr(path, _T('\\'));
    }
  }

  return 0;
}

#else

int grpc_rb_load_core() { return 1; }

#endif
