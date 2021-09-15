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
rom '@firebase/messaging/sw';

import { getFakeApp, getFakeModularMessaging } from './fakes';

import { MessagingCompatImpl } from '../src/messaging-compat';
import { expect } from 'chai';
import { stub } from 'sinon';

describe('messagingCompat', () => {
  const messagingCompat = new MessagingCompatImpl(
    getFakeApp(),
    getFakeModularMessaging()
  );

  //Stubs
  const getTokenStub = stub(messagingModule, 'getToken');
  const deleteTokenStub = stub(messagingModule, 'deleteToken');
  const onMessageStub = stub(messagingModule, 'onMessage');
  const onBackgroundMessageStub = stub(
    messagingModuleInSw,
    'onBackgroundMessage'
  );

  it('routes messagingCompat.getToken to modular SDK', () => {
    void messagingCompat.getToken();
    expect(getTokenStub.called).to.be.true;
  });

  it('routes messagingCompat.deleteToken to modular SDK', () => {
    void messagingCompat.deleteToken();
    expect(deleteTokenStub.called).to.be.true;
  });

  it('routes messagingCompat.onMessage to modular SDK', () => {
    messagingCompat.onMessage(_ => {});
    expect(onMessageStub.called).to.be.true;
  });

  it('routes messagingCompat.onBackgroundMessage to modular SDK', () => {
    messagingCompat.onBackgroundMessage(_ => {});
    expect(onBackgroundMessageStub.called).to.be.true;
  });
});
