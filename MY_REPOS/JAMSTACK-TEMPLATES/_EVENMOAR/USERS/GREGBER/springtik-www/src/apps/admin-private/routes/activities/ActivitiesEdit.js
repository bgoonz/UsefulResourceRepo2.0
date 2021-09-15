import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import provide from '~/modules/observo/provide';
import connect from '~/modules/observo/connect';
import subscribe from '~/modules/observo/subscribeDeprecated';
import {Subject} from 'rxjs/Subject';
import {map} from 'rxjs/operator/map';
import {mapTo} from 'rxjs/operator/mapTo';
import {distinctUntilChanged} from 'rxjs/operator/distinctUntilChanged';
import {combineLatest} from 'rxjs/operator/combineLatest';
import {merge} from 'rxjs/operator/merge';
import {scan} from 'rxjs/operator/scan';
import {publishReplay} from 'rxjs/operator/publishReplay';
import {withLatestFrom} from 'rxjs/operator/withLatestFrom';
import {filter} from 'rxjs/operator/filter';
import {watchTask} from '~/modules/observables/operator/watchTask';
import {resetTask} from '~/modules/observables/operator/resetTask';
import slugify from 'underscore.string/slugify';
import api from '~/apps/admin-private/api';
import Banner from '~/modules/components/Banner';
import ActivitiesForm from './ActivitiesForm';
import styles from './activities.scss';

export const CategoriesEdit = ({
  activity,
  onActivityChange,
  onSubmit,
  onDelete,
  result = {},
  deleteResult = {},
}) => (
  <div className={styles.section}>
    <Banner
      show={Boolean(result.success)}
      uiStyle="success"
    >
      L'activité a bien été modifiée.
    </Banner>
    <Banner
      show={Boolean(result.error || deleteResult.error)}
      uiStyle="danger"
    >
      Une erreur est survenue, veuillez réessayer.
    </Banner>
    <ActivitiesForm
      {...{
        result,
        deleteResult,
        activity,
        onActivityChange,
        onSubmit,
        onDelete,
        disabled: !activity,
      }}
    />
  </div>
);

CategoriesEdit.propTypes = {
  deleteResult: PropTypes.object,
  result: PropTypes.object,
  activity: PropTypes.object,
  onActivityChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
};

export const provideObservables = ({
  props$,
  activities$,
}) => {
  const submit$ = new Subject();
  const delete$ = new Subject();
  const activityChange$ = new Subject();

  const activityId$ = props$
    ::map(({params: {activityId}}) => activityId)
    ::distinctUntilChanged();

  const activity$ = activities$
    ::combineLatest(
      activityId$,
      (categories, activityId) =>
        categories.find(({id}) => activityId === id)
    )
    ::map(activity => {
      if (!activity.slug) {
        return {
          ...activity,
          slug: slugify(activity.name),
        };
      }

      return activity;
    })
    ::merge(activityChange$)
    ::scan((previous, next) => {
      if (previous.id === next.id && previous.name !== next.name) {
        return {
          ...next,
          slug: slugify(next.name),
        };
      }

      return next;
    })
    ::publishReplay(1).refCount();

  const result$ = submit$
    ::withLatestFrom(activity$, (model, {id}) => ({
      ...model,
      id,
    }))
    ::watchTask(model => api.activities.update(model))
    ::resetTask({delay: 4000})
    ::merge(activityId$::mapTo({idle: true}))
    ::publishReplay(1).refCount();

  const deleteResult$ = delete$
    ::filter(() =>
      window.confirm('Êtes vous sûr de vouloir supprimer l\'activité ?')
    )
    ::withLatestFrom(props$)
    ::map(([, {params: {activityId}}]) => activityId)
    ::watchTask(id => api.activities.delete(id))
    ::merge(activityId$::mapTo({idle: true}))
    ::publishReplay(1).refCount();

  return {
    submit$,
    activityChange$,
    delete$,
    activity$,
    result$,
    deleteResult$,
  };
};


export default compose(
  provide(provideObservables),
  subscribe({
    observo: PropTypes.shape({
      observables: PropTypes.shape({
        deleteResult$: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired,
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }, ({
    observo,
    router,
  }) => observo.observables.deleteResult$
    ::filter(({success}) => success)
    .subscribe(() => {
      router.push('/activities');
    })
  ),
  connect(({
    submit$,
    activity$,
    activityChange$,
    delete$,
    result$,
    deleteResult$,
  }) => ({
    onSubmit: submit$,
    activity: activity$,
    onActivityChange: activityChange$,
    onDelete: delete$,
    result: result$,
    deleteResult: deleteResult$,
  })),
  withStyles(styles)
)(CategoriesEdit);
