import {Subject} from 'rxjs/Subject';
import {watchTaskStatic} from '~/modules/observables/operator/watchTask';

export function observe(promise, {next}) {
  return promise
    .then(output => {
      next(output);
      return output;
    });
}

export default (name, {api}) => {
  const created$ = new Subject();
  const updated$ = new Subject();
  const deleted$ = new Subject();

  return {
    $fetchAll(...args) {
      return watchTaskStatic(() => this.fetchAll(...args));
    },
    fetchAll(query) {
      return api[name].fetchAll(query);
    },

    $fetch(...args) {
      return watchTaskStatic(() => this.fetch(...args));
    },
    fetch(id) {
      return api[name].fetch(id);
    },

    created$,
    $create(...args) {
      return watchTaskStatic(() => this.create(...args));
    },
    create(model) {
      return observe(api[name].create(model), created$);
    },

    updated$,
    $update(...args) {
      return watchTaskStatic(() => this.update(...args));
    },
    update(model) {
      return observe(api[name].update(model), updated$);
    },

    deleted$,
    $delete(...args) {
      return watchTaskStatic(() => this.delete(...args));
    },
    delete(id) {
      return observe(api[name].delete(id).then(() => id), deleted$);
    },
  };
};
