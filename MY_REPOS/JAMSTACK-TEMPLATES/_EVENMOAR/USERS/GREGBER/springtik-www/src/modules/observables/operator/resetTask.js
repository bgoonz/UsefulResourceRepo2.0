import {of} from 'rxjs/observable/of';
import {mapTo} from 'rxjs/operator/mapTo';
import {filter} from 'rxjs/operator/filter';
import {merge} from 'rxjs/operator/merge';
import {switchMap} from 'rxjs/operator/switchMap';
import {delay} from 'rxjs/operator/delay';

export function resetTask({
  delay: delayTime = 0,
  filter: filterFn = () => true,
} = {}) {
  return this::switchMap(data =>
      of(data)
        ::merge(
          of(data)
            ::filter(filterFn)
            ::delay(delayTime)
            ::mapTo(undefined)
        )
  );
}
