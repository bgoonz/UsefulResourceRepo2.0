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
ned' && self.location?.href) || '';
}

export function _isHttpOrHttps(): boolean {
  return _getCurrentScheme() === 'http:' || _getCurrentScheme() === 'https:';
}

export function _getCurrentScheme(): string | null {
  return (typeof self !== 'undefined' && self.location?.protocol) || null;
}
