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
/package.json';
import { Component, ComponentType } from '@firebase/component';
import { FirebaseInstallations as FirebaseInstallationsCompat } from '@firebase/installations-types';
import { InstallationsCompat } from './installationsCompat';

declare module '@firebase/component' {
  interface NameServiceMapping {
    'installations-compat': FirebaseInstallationsCompat;
  }
}

function registerInstallations(instance: _FirebaseNamespace): void {
  instance.INTERNAL.registerComponent(
    new Component(
      'installations-compat',
      container => {
        const app = container.getProvider('app-compat').getImmediate()!;
        const installations = container
          .getProvider('installations')
          .getImmediate()!;
        return new InstallationsCompat(app, installations);
      },
      ComponentType.PUBLIC
    )
  );

  instance.registerVersion(name, version);
}

registerInstallations(firebase as _FirebaseNamespace);

/**
 * Define extension behavior of `registerInstallations`
 */
declare module '@firebase/app-compat' {
  interface FirebaseNamespace {
    installations(app?: FirebaseApp): FirebaseInstallationsCompat;
  }
  interface FirebaseApp {
    installations(): FirebaseInstallationsCompat;
  }
}
