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
m '../interfaces/internal-message-payload';

export function isConsoleMessage(data: unknown): data is ConsoleMessageData {
  // This message has a campaign ID, meaning it was sent using the Firebase Console.
  return typeof data === 'object' && !!data && CONSOLE_CAMPAIGN_ID in data;
}
