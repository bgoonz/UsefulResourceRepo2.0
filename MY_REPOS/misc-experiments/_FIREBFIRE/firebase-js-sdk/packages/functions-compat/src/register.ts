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

} from '@firebase/app-compat';
import { FunctionsService } from './service';
import {
  Component,
  ComponentType,
  InstanceFactory,
  ComponentContainer,
  InstanceFactoryOptions
} from '@firebase/component';

const DEFAULT_REGION = 'us-central1';

const factory: InstanceFactory<'functions-compat'> = (
  container: ComponentContainer,
  { instanceIdentifier: regionOrCustomDomain }: InstanceFactoryOptions
) => {
  // Dependencies
  const app = container.getProvider('app-compat').getImmediate();
  const functionsServiceExp = container
    .getProvider('functions')
    .getImmediate({
      identifier: regionOrCustomDomain ?? DEFAULT_REGION
    });

  return new FunctionsService(app, functionsServiceExp);
};

export function registerFunctions(): void {
  const namespaceExports = {
    Functions: FunctionsService
  };
  (firebase as _FirebaseNamespace).INTERNAL.registerComponent(
    new Component('functions-compat', factory, ComponentType.PUBLIC)
      .setServiceProps(namespaceExports)
      .setMultipleInstances(true)
  );
}
