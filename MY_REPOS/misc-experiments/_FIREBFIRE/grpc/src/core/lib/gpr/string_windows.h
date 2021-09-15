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
WINDOWS_H
#define GRPC_CORE_LIB_GPR_STRING_WINDOWS_H

#include <grpc/support/port_platform.h>

#ifdef GPR_WINDOWS

/* These allocate new strings using gpr_malloc to convert from and to utf-8. */
LPTSTR gpr_char_to_tchar(LPCSTR input);
LPSTR gpr_tchar_to_char(LPCTSTR input);

#endif /* GPR_WINDOWS */

#endif /* GRPC_CORE_LIB_GPR_STRING_WINDOWS_H */
