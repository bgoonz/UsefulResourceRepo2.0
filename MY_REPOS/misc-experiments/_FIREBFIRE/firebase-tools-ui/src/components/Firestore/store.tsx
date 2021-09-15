/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { Action, createReducer } from 'typesafe-actions';

import * as actions from './actions';
import { CollectionFilter } from './models';

export interface CollectionFilters {
  [path: string]: CollectionFilter;
}

export interface Store {
  collectionFilters: CollectionFilters;
}

const INIT_STATE: Store = { collectionFilters: {} };

const firestoreStoreContext = React.createContext<{
  store: Store;
  dispatch: React.Dispatch<any>;
}>({ store: INIT_STATE, dispatch: () => {} });

const reducer = createReducer<Store, Action>(INIT_STATE)
  .handleAction(
    actions.addCollectionFilter,
    produce((draft, { payload }) => {
      const { path, ...filter } = payload;
      draft.collectionFilters[payload.path] = filter;
    })
  )
  .handleAction(
    actions.removeCollectionFilter,
    produce((draft, { payload }) => {
      delete draft.collectionFilters[payload.path];
    })
  );

const storeReducer: React.Reducer<Store, Action> = (state, action) => {
  return (reducer.handlers as any)[action.type](state, action);
};

export const FirestoreStore: React.FC<{ initState?: Store }> = ({
  initState = INIT_STATE,
  children,
}) => {
  const [store, dispatch] = React.useReducer(storeReducer, initState);
  return (
    <firestoreStoreContext.Provider value={{ store, dispatch }}>
      {children}
    </firestoreStoreContext.Provider>
  );
};

export function useFirestoreStore(): {
  store: Store;
  dispatch: React.Dispatch<Action>;
} {
  const context = React.useContext(firestoreStoreContext);
  if (context === undefined) {
    throw new Error('useFirestoreStore must be used within a <FirestoreStore>');
  }
  return context;
}

export function useStore(): Store {
  const { store } = useFirestoreStore();
  return React.useMemo(() => store, [store]);
}

export function useDispatch(): React.Dispatch<Action> {
  const { dispatch } = useFirestoreStore();
  return React.useMemo(() => dispatch, [dispatch]);
}

export function useCollectionFilter(
  path: string
): CollectionFilter | undefined {
  const { store } = useFirestoreStore();
  return store.collectionFilters[path];
}
