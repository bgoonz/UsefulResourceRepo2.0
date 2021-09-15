/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

/**
 * Return a connectable hostname, replacing wildcard 0.0.0.0 or :: with loopback
 * addresses 127.0.0.1 / ::1 correspondingly. See below for why this is needed:
 * https://github.com/firebase/firebase-tools-ui/issues/286
 *
 * This assumes emulators are running on the same device as fallbackHost (e.g.
 * hub), which should hold if both are started from the same CLI command.
 * @private
 */
export function fixHostname(host: string, fallbackHost?: string): string {
  host = host.replace('[', '').replace(']', ''); // Remove IPv6 brackets
  if (host === '0.0.0.0') {
    host = fallbackHost || '127.0.0.1';
  } else if (host === '::') {
    host = fallbackHost || '::1';
  }
  return host;
}

/**
 * Create a URL with host, port, and path. Handles IPv6 bracketing correctly.
 * @private
 */
export function makeUrl(hostAndPort: HostAndPort | string, path: string): URL {
  if (typeof hostAndPort === 'object') {
    const { host, port } = hostAndPort;
    if (host.includes(':')) {
      hostAndPort = `[${host}]:${port}`;
    } else {
      hostAndPort = `${host}:${port}`;
    }
  }
  const url = new URL(`http://${hostAndPort}/`);
  url.pathname = path;
  return url;
}
