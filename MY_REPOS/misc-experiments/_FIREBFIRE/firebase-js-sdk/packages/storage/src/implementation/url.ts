/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
ate and manipulate URLs for the server API.
 */
import { UrlParams } from './requestinfo';

export function makeUrl(
  urlPart: string,
  host: string,
  protocol: string
): string {
  let origin = host;
  if (protocol == null) {
    origin = `https://${host}`;
  }
  return `${protocol}://${origin}/v0${urlPart}`;
}

export function makeQueryString(params: UrlParams): string {
  const encode = encodeURIComponent;
  let queryPart = '?';
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const nextPart = encode(key) + '=' + encode(params[key]);
      queryPart = queryPart + nextPart + '&';
    }
  }

  // Chop off the extra '&' or '?' on the end
  queryPart = queryPart.slice(0, -1);
  return queryPart;
}
