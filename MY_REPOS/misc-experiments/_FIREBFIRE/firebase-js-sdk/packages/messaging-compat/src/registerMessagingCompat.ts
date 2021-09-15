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

  ComponentContainer,
  ComponentType,
  InstanceFactory
} from '@firebase/component';
import { MessagingCompatImpl, isSupported } from './messaging-compat';
import firebase, { _FirebaseNamespace } from '@firebase/app-compat';

declare module '@firebase/component' {
  interface NameServiceMapping {
    'messaging-compat': MessagingCompatImpl;
  }
}

const messagingCompatFactory: InstanceFactory<'messaging-compat'> = (
  container: ComponentContainer
) => {
  if (self && 'ServiceWorkerGlobalScope' in self) {
    // in sw
    return new MessagingCompatImpl(
      container.getProvider('app-compat').getImmediate(),
      container.getProvider('messaging-sw').getImmediate()
    );
  } else {
    // in window
    return new MessagingCompatImpl(
      container.getProvider('app-compat').getImmediate(),
      container.getProvider('messaging').getImmediate()
    );
  }
};

const NAMESPACE_EXPORTS = {
  isSupported
};

export function registerMessagingCompat(): void {
  (firebase as _FirebaseNamespace).INTERNAL.registerComponent(
    new Component(
      'messaging-compat',
      messagingCompatFactory,
      ComponentType.PUBLIC
    ).setServiceProps(NAMESPACE_EXPORTS)
  );
}
