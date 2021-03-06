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
pport. */

#include <grpc/support/port_platform.h>

#ifdef GPR_WINDOWS

/* Some platforms (namely msys) need wchar to be included BEFORE
   anything else, especially strsafe.h. */
#include <wchar.h>

#include <inttypes.h>
#include <stdarg.h>
#include <stdio.h>
#include <string.h>
#include <strsafe.h>

#include <grpc/support/alloc.h>
#include <grpc/support/log_windows.h>
#include <grpc/support/string_util.h>

#include "src/core/lib/gpr/string.h"
#include "src/core/lib/gpr/string_windows.h"

#if defined UNICODE || defined _UNICODE
LPTSTR
gpr_char_to_tchar(LPCSTR input) {
  LPTSTR ret;
  int needed = MultiByteToWideChar(CP_UTF8, 0, input, -1, NULL, 0);
  if (needed <= 0) return NULL;
  ret = (LPTSTR)gpr_malloc((unsigned)needed * sizeof(TCHAR));
  MultiByteToWideChar(CP_UTF8, 0, input, -1, ret, needed);
  return ret;
}

LPSTR
gpr_tchar_to_char(LPCTSTR input) {
  LPSTR ret;
  int needed = WideCharToMultiByte(CP_UTF8, 0, input, -1, NULL, 0, NULL, NULL);
  if (needed <= 0) return NULL;
  ret = (LPSTR)gpr_malloc((unsigned)needed);
  WideCharToMultiByte(CP_UTF8, 0, input, -1, ret, needed, NULL, NULL);
  return ret;
}
#else
LPSTR gpr_tchar_to_char(LPCTSTR input) { return (LPSTR)gpr_strdup(input); }

LPTSTR gpr_char_to_tchar(LPCTSTR input) { return (LPTSTR)gpr_strdup(input); }
#endif

char* gpr_format_message(int messageid) {
  LPTSTR tmessage;
  char* message;
  DWORD status = FormatMessage(
      FORMAT_MESSAGE_ALLOCATE_BUFFER | FORMAT_MESSAGE_FROM_SYSTEM |
          FORMAT_MESSAGE_IGNORE_INSERTS,
      NULL, (DWORD)messageid, MAKELANGID(LANG_ENGLISH, SUBLANG_DEFAULT),
      (LPTSTR)(&tmessage), 0, NULL);
  if (status == 0) return gpr_strdup("Unable to retrieve error string");
  message = gpr_tchar_to_char(tmessage);
  LocalFree(tmessage);
  return message;
}

#endif /* GPR_WINDOWS */
