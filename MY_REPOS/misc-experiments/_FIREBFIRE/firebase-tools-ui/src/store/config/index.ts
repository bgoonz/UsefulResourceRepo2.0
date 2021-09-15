/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

export function hostAndPort(host: string, port: number | string): string {
  // Correctly put IPv6 addresses in brackets.
  return host.indexOf(':') >= 0 ? `[${host}]:${port}` : `${host}:${port}`;
}
