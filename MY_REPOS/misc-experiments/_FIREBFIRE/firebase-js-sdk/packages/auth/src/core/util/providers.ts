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

}

/**
 * Takes a set of UserInfo provider data and converts it to a set of names
 */
export function providerDataAsNames<T extends ProviderAssociatedObject>(
  providerData: T[]
): Set<string> {
  return new Set(
    providerData
      .map(({ providerId }) => providerId)
      .filter(pid => !!pid) as string[]
  );
}
