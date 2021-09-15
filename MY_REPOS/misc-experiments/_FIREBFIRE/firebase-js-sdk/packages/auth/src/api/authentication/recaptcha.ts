/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
/public_types';

interface GetRecaptchaParamResponse {
  recaptchaSiteKey?: string;
}

export async function getRecaptchaParams(auth: Auth): Promise<string> {
  return (
    (
      await _performApiRequest<void, GetRecaptchaParamResponse>(
        auth,
        HttpMethod.GET,
        Endpoint.GET_RECAPTCHA_PARAM
      )
    ).recaptchaSiteKey || ''
  );
}
