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

    plugins: {
      browsertab: {
        isAvailable(cb: (available: boolean) => void): void;
        openUrl(url: string): void;
        close(): void;
      };
    };

    InAppBrowser: {
      open(url: string, target: string, options: string): InAppBrowserRef;
    };
  };

  universalLinks: {
    subscribe(
      n: null,
      cb: (event: Record<string, string> | null) => void
    ): void;
  };

  BuildInfo: {
    readonly packageName: string;
    readonly displayName: string;
  };

  handleOpenURL(url: string): void;
}

export interface InAppBrowserRef {
  close?: () => void;
}

export function _cordovaWindow(): CordovaWindow {
  return (window as unknown) as CordovaWindow;
}
