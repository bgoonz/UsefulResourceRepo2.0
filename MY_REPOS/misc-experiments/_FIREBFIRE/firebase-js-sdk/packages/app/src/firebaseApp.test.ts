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

import { FirebaseAppImpl } from './firebaseApp';
import { ComponentContainer } from '@firebase/component';

describe('FirebaseAppNext', () => {
  it('has various accessors', () => {
    const options = {
      apiKey: 'APIKEY'
    };
    const app = new FirebaseAppImpl(
      options,
      { name: 'test', automaticDataCollectionEnabled: false },
      new ComponentContainer('test')
    );

    expect(app.automaticDataCollectionEnabled).to.be.false;
    expect(app.name).to.equal('test');
    expect(app.options).to.deep.equal(options);
  });

  it('deep-copies options', () => {
    const options = {
      apiKey: 'APIKEY'
    };
    const app = new FirebaseAppImpl(
      options,
      { name: 'test', automaticDataCollectionEnabled: false },
      new ComponentContainer('test')
    );

    expect(app.options).to.not.equal(options);
    expect(app.options).to.deep.equal(options);
  });

  it('sets automaticDataCollectionEnabled', () => {
    const app = new FirebaseAppImpl(
      {},
      { name: 'test', automaticDataCollectionEnabled: false },
      new ComponentContainer('test')
    );

    expect(app.automaticDataCollectionEnabled).to.be.false;
    app.automaticDataCollectionEnabled = true;
    expect(app.automaticDataCollectionEnabled).to.be.true;
  });

  it('throws accessing any property after being deleted', () => {
    const app = new FirebaseAppImpl(
      {},
      { name: 'test', automaticDataCollectionEnabled: false },
      new ComponentContainer('test')
    );

    expect(() => app.name).to.not.throw();
    ((app as unknown) as FirebaseAppImpl).isDeleted = true;

    expect(() => {
      app.name;
    }).throws("Firebase App named 'test' already deleted");
    expect(() => app.options).throws(
      "Firebase App named 'test' already deleted"
    );
    expect(() => app.automaticDataCollectionEnabled).throws(
      "Firebase App named 'test' already deleted"
    );
  });
});
