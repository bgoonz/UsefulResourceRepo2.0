import {Subject} from 'rxjs/Subject';
import {watchTaskStatic} from '~/modules/observables/operator/watchTask';
import ApiError from '~/modules/ApiError';

export function observe(promise, observer) {
  return promise
    .then(output => {
      observer.next(output);
      return output;
    });
}

export function handleHttpError(err) {
  if (err.response && err.response.bodyData)
    throw new ApiError(
      err.response.bodyData.error.message,
      err.response.bodyData.error.code
    );

  return err;
}

export function wrapHttp(promise) {
  return promise
    .then(({bodyData}) => bodyData)
    .catch(handleHttpError);
}

export default (name, {http}) => {
  const baseUrl = `/api/${name}`;
  const created$ = new Subject();
  const updated$ = new Subject();
  const deleted$ = new Subject();

  return {
    $fetchAll(...args) {
      return watchTaskStatic(() => this.fetchAll(...args));
    },
    fetchAll(query) {
      return wrapHttp(http.get(baseUrl, {query}));
    },

    $fetch(...args) {
      return watchTaskStatic(() => this.fetch(...args));
    },
    fetch(id) {
      return wrapHttp(http.get(`${baseUrl}/${id}`));
    },

    created$,
    $create(...args) {
      return watchTaskStatic(() => this.create(...args));
    },
    create(body) {
      return observe(
        wrapHttp(http.post(baseUrl, {body})),
        created$
      );
    },

    updated$,
    $update(...args) {
      return watchTaskStatic(() => this.update(...args));
    },
    update(body) {
      return observe(
        wrapHttp(http.patch(`${baseUrl}/${body.id}`, {body})),
        updated$
      );
    },

    deleted$,
    $delete(...args) {
      return watchTaskStatic(() => this.delete(...args));
    },
    delete(id) {
      return observe(
        http.delete(`${baseUrl}/${id}`)
          .then(() => id)
          .catch(handleHttpError),
        deleted$
      );
    },
  };
};
