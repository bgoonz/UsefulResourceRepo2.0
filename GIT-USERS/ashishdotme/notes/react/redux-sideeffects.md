---
id: redux-sideeffects
title: Redux Sideffects
---

Redux is a predictable state container for JavaScript apps which makes state management easier but the actions
dispatched via Redux are synchronous. For network calls, we need the ability to dispatch actions asynchronously.
Dispatching actions asynchronously can be done by popular middlewares like i.e Redux Thunk and Redux Saga.
Redux middleware is code that intercepts actions coming into the store via the dispatch() method.

## Sideeffects

When doing the fetch request in redux, we can't be sure what the call will return or that it will even succeed.
This is known as a side effect.

## Redux Thunk

Redux Thunk uses promises for async actions.

```javascript
const getPosts = ({dispatch}) => {
  dispatch({type: 'POSTS_LOADING'})
  fetch('api/posts')
    .then(res => dispatch({type: 'GET_POSTS', payload: res.data}))
    .catch(err => dispatch({type: 'GET_ERRORS', payload: {}))
}

store.dispatch(getPosts)
```

## Redux Saga

Redux Saga uses generators for async actions.

```javascript
export default function* onGetPosts() {
  yield takeLatest('RECORDS/FETCH', function getPosts() {

    try {
        const response = yield call(fetch, 'api/posts');
        const responseBody = response.json();
    } catch (e) {
        yield put(fetchFailed(e));
        return;
    }

    yield put(setRecords(responseBody.records));
  });
}
```
