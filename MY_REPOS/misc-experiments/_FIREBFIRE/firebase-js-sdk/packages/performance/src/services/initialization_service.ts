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
te_config_service';
import { Api } from './api_service';
import { PerformanceController } from '../controllers/perf';

const enum InitializationStatus {
  notInitialized = 1,
  initializationPending,
  initialized
}

let initializationStatus = InitializationStatus.notInitialized;

let initializationPromise: Promise<void> | undefined;

export function getInitializationPromise(
  performanceController: PerformanceController
): Promise<void> {
  initializationStatus = InitializationStatus.initializationPending;

  initializationPromise =
    initializationPromise || initializePerf(performanceController);

  return initializationPromise;
}

export function isPerfInitialized(): boolean {
  return initializationStatus === InitializationStatus.initialized;
}

function initializePerf(
  performanceController: PerformanceController
): Promise<void> {
  return getDocumentReadyComplete()
    .then(() => getIidPromise(performanceController.installations))
    .then(iid => getConfig(performanceController, iid))
    .then(
      () => changeInitializationStatus(),
      () => changeInitializationStatus()
    );
}

/**
 * Returns a promise which resolves whenever the document readystate is complete or
 * immediately if it is called after page load complete.
 */
function getDocumentReadyComplete(): Promise<void> {
  const document = Api.getInstance().document;
  return new Promise(resolve => {
    if (document && document.readyState !== 'complete') {
      const handler = (): void => {
        if (document.readyState === 'complete') {
          document.removeEventListener('readystatechange', handler);
          resolve();
        }
      };
      document.addEventListener('readystatechange', handler);
    } else {
      resolve();
    }
  });
}

function changeInitializationStatus(): void {
  initializationStatus = InitializationStatus.initialized;
}
