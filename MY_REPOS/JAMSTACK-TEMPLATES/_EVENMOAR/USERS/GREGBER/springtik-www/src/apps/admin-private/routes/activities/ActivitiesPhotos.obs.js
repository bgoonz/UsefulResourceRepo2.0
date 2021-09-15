import {Subject} from 'rxjs/Subject';
import {map} from 'rxjs/operator/map';
import {withLatestFrom} from 'rxjs/operator/withLatestFrom';
import {watchTask} from '~/modules/observables/operator/watchTask';
import api from '~/apps/admin-private/api';

export default () => ({props$}) => {
  const activityId$ = props$
    ::map(({activityId}) => activityId);

  const uploadSuccess$ = new Subject();

  const saveResult$ = uploadSuccess$
    ::withLatestFrom(activityId$)
    ::watchTask(([results, activityId]) =>
      Promise.all(
        results.map(result =>
          api.pictures.create({
            publicId: result.public_id,
            activityId,
          })
        )
      )
    );

  const trash$ = new Subject();

  const trashResult$ = trash$
    ::watchTask(({id}) => api.pictures.update({
      id,
      activityId: null,
    }));

  return {
    saveResult$,
    trash$,
    trashResult$,
    uploadSuccess$,
  };
};
