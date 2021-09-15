/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *


export function bannerText() {
  let BANNER_TEXT = readFileSync(resolve(__dirname, 'banner.txt'), 'utf8');
  console.log(BANNER_TEXT);
}
