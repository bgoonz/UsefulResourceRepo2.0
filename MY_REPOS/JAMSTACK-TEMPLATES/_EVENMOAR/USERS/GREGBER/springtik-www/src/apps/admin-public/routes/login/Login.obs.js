import fetch from 'isomorphic-fetch';
import {Subject} from 'rxjs/Subject';
import {publishReplay} from 'rxjs/operator/publishReplay';
import {scan} from 'rxjs/operator/scan';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {watchTask} from '~/modules/observables/operator/watchTask';

export default () => () => {
  const model$ = new BehaviorSubject({
    email: '',
    password: '',
  })
  ::scan((model, change) => ({
    ...model,
    ...change,
  }));

  const submit$ = new Subject();

  const result$ = submit$
    ::watchTask(model =>
      fetch('/api/login', {
        body: JSON.stringify(model),
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
      })
      .then(response => response.json())
    )
    ::publishReplay(1).refCount();

  return {
    model$,
    submit$,
    result$,
  };
};
