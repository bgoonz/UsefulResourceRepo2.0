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
rc/public-types';
import { ComponentType, Component } from '@firebase/component';

export class TestService implements _FirebaseService {
  readonly _delegate = {};
  constructor(private app_: FirebaseApp, public instanceIdentifier?: string) {}

  get app(): FirebaseApp {
    return this.app_;
  }

  delete(): Promise<void> {
    return new Promise((resolve: (v?: void) => void) => {
      setTimeout(() => resolve(), 10);
    });
  }
}

export function createTestComponent(
  name: string,
  multiInstances = false,
  type = ComponentType.PUBLIC
): Component {
  const component = new Component(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name as any,
    container =>
      new TestService(container.getProvider('app-compat').getImmediate()),
    type
  );
  component.setMultipleInstances(multiInstances);
  return component;
}
