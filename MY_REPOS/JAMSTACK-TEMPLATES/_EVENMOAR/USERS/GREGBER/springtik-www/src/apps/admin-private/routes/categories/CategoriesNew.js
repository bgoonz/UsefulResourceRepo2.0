import React, {PropTypes} from 'react';
import api from '~/apps/admin-private/api';
import {Subject} from 'rxjs/Subject';
import {share} from 'rxjs/operator/share';
import {filter} from 'rxjs/operator/filter';
import {watchTask} from '~/modules/observables/operator/watchTask';
import compose from 'recompose/compose';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import provide from '~/modules/observo/provide';
import connect from '~/modules/observo/connect';
import subscribe from '~/modules/observo/subscribeDeprecated';
import CategoriesForm from './CategoriesForm';
import Banner from '~/modules/components/Banner';
import styles from './categories.scss';

export const CategoriesNew = ({
  onSubmit,
  onDelete,
  onCategoryChange,
  result = {},
  category,
}) => (
  <div className={styles.section}>
    <Banner
      show={result.error}
      uiStyle="danger"
    >
      Une erreur est survenue, veuillez réessayer.
    </Banner>
    <CategoriesForm
      {...{
        onSubmit,
        onDelete,
        onCategoryChange,
        result,
        category,
      }}
    />
  </div>
);

CategoriesNew.propTypes = {
  result: PropTypes.shape({
    error: PropTypes.bool,
  }),
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onCategoryChange: PropTypes.func.isRequired,
  category: PropTypes.object,
};

export const provideObservables = () => {
  const submit$ = new Subject();

  const result$ = submit$
    ::watchTask(model => api.categories.create(model))
    ::share();

  const category$ = new Subject();

  return {
    submit$,
    result$,
    category$,
  };
};

export default compose(
  provide(provideObservables),
  connect(({
    submit$,
    result$,
    category$,
  }) => ({
    onSubmit: submit$,
    result: result$,
    category: category$,
    onCategoryChange: category$,
  })),
  subscribe({
    observo: PropTypes.shape({
      observables: PropTypes.shape({
        result$: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired,
    router: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }, ({
    observo,
    router,
  }) => observo.observables.result$
    ::filter(({success}) => success)
    .subscribe(({
      output: {
        id,
      },
    }) => {
      router.push(`/categories/edit/${id}`);
    })
  ),
  withStyles(styles)
)(CategoriesNew);
