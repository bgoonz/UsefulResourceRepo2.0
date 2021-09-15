/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

 */
import { GTAG_URL } from '../src/constants';

export function removeGtagScript(): void {
  const scriptTags = window.document.getElementsByTagName('script');
  for (const tag of Object.values(scriptTags)) {
    if (tag.src) {
      if (tag.src.includes(GTAG_URL) && tag.parentElement) {
        tag.parentElement!.removeChild(tag);
      }
    }
  }
}
