/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
h;
  jest
    .spyOn(global, 'fetch')
    .mockImplementation((input: RequestInfo, init?: RequestInit) => {
      if (/^http?:\/\/.*\/b$/.test(input.toString())) {
        return Promise.resolve(({
          json: () => {
            return {
              items: buckets.map((name) => ({ name })),
            };
          },
        } as unknown) as Response);
      }

      return actualFetch(input, init);
    });
}
