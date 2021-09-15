/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
saga/effects';
import * as reselect from 'reselect';

import { AuthState } from '../components/Auth/types';
import { authReducer } from './auth/reducer';
import { authSaga } from './auth/sagas';

// DEPRECATED, do not add more Redux states / reducers. Instead, use `swr` for
// simple fetches and polling, and consider keeping state locally using hooks.
export interface AppState {
  auth: AuthState; // still kept in Redux for historical reasons.
}

export function* rootSaga() {
  yield all([fork(authSaga)]);
}

export const rootReducer = combineReducers<AppState>({
  auth: authReducer,
});

export function createStructuredSelector<T>(
  selectors: { [K in keyof T]: reselect.Selector<AppState, T[K]> }
) {
  return reselect.createStructuredSelector<AppState, T>(selectors);
}
