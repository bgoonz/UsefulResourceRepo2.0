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
, _FirebaseService } from '../types';
import { FirebaseAppLiteImpl } from './firebaseAppLite';
import { createFirebaseNamespaceCore } from '../firebaseNamespaceCore';
import { Component, ComponentType } from '@firebase/component';

export function createFirebaseNamespaceLite(): FirebaseNamespace {
  const namespace = createFirebaseNamespaceCore(FirebaseAppLiteImpl);

  namespace.SDK_VERSION = `${namespace.SDK_VERSION}_LITE`;

  const registerComponent = namespace.INTERNAL.registerComponent;
  namespace.INTERNAL.registerComponent = registerComponentForLite;

  /**
   * This is a special implementation, so it only works with performance.
   * only allow performance SDK to register.
   */
  function registerComponentForLite(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: Component<any>
  ): FirebaseServiceNamespace<_FirebaseService> | null {
    // only allow performance to register with firebase lite
    if (
      component.type === ComponentType.PUBLIC &&
      !component.name.includes('performance') &&
      !component.name.includes('installations')
    ) {
      throw Error(`${name} cannot register with the standalone perf instance`);
    }

    return registerComponent(component);
  }

  return namespace;
}
