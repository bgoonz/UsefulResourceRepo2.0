/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

  message: string;
  timestamp: number;
  data: {
    user: { [key: string]: any };
    metadata?: {
      level: string;
      message: string;
      function?: {
        name: string;
      };
      emulator?: {
        name: string;
      };
    };
  };
}
