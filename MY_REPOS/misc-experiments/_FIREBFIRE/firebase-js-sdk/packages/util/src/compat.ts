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

}

export function getModularInstance<ExpService>(
  service: Compat<ExpService> | ExpService
): ExpService {
  if (service && (service as Compat<ExpService>)._delegate) {
    return (service as Compat<ExpService>)._delegate;
  } else {
    return service as ExpService;
  }
}
