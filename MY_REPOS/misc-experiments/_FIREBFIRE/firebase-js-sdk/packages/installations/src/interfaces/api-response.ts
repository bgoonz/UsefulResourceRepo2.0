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

  readonly authToken: GenerateAuthTokenResponse;
  readonly fid?: string;
}

export interface GenerateAuthTokenResponse {
  readonly token: string;

  /**
   * Encoded as a string with the suffix 's' (indicating seconds), preceded by
   * the number of seconds.
   *
   * Example: "604800s".
   */
  readonly expiresIn: string;
}
