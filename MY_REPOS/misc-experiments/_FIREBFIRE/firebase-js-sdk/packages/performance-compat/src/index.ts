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

  Component,
  ComponentContainer,
  ComponentType
} from '@firebase/component';
import { PerformanceCompatImpl } from './performance';
import { name as packageName, version } from '../package.json';
import { FirebasePerformance as FirebasePerformanceCompat } from '@firebase/performance-types';

function registerPerformanceCompat(firebaseInstance: _FirebaseNamespace): void {
  firebaseInstance.INTERNAL.registerComponent(
    new Component(
      'performance-compat',
      performanceFactory,
      ComponentType.PUBLIC
    )
  );

  firebaseInstance.registerVersion(packageName, version);
}

function performanceFactory(
  container: ComponentContainer
): PerformanceCompatImpl {
  const app = container.getProvider('app-compat').getImmediate();
  // The following call will always succeed.
  const performance = container.getProvider('performance').getImmediate();

  return new PerformanceCompatImpl(app, performance);
}

registerPerformanceCompat(firebase as _FirebaseNamespace);

declare module '@firebase/app-compat' {
  interface FirebaseNamespace {
    performance: {
      (app?: FirebaseApp): FirebasePerformanceCompat;
    };
  }
  interface FirebaseApp {
    performance(): FirebasePerformanceCompat;
  }
}
