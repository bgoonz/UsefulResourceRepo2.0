import React, {PropTypes} from 'react';
import Link from 'react-router/lib/Link';
import classNames from 'classnames';
import compose from 'recompose/compose';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {of} from 'rxjs/observable/of';
import {mergeStatic} from 'rxjs/operator/merge';
import {takeUntil} from 'rxjs/operator/takeUntil';
import {last} from 'rxjs/operator/last';
import {_do} from 'rxjs/operator/do';
import {switchMap} from 'rxjs/operator/switchMap';
import {filter} from 'rxjs/operator/filter';
import {map} from 'rxjs/operator/map';
import {startWith} from 'rxjs/operator/startWith';
import {publishReplay} from 'rxjs/operator/publishReplay';
import {combineLatest} from 'rxjs/operator/combineLatest';
import {distinctUntilChanged} from 'rxjs/operator/distinctUntilChanged';
import provide from '~/modules/observo/provide';
import universalProvide from '~/modules/observo/universalProvide';
import connect from '~/modules/observo/connect';
import api from '~/apps/admin-private/api';
import styles from './categories.scss';
import Toolbar from '~/modules/components/Toolbar';
import List from '~/modules/components/List';
import ListItem from '~/modules/components/ListItem';

export const Categories = ({
  categories,
  category,
  children,
}) => {
  const level1Id = category && category.level === 1
      ? category.id
      : category && category.level === 2
        ? category.parentId
        : null;

  return (
    <main>
      <Toolbar>
        <Link to="/categories/new">
          <i className="fa fa-plus-circle" />Créer une catégorie
        </Link>
      </Toolbar>
      <div className={styles.workspace}>
        <div className={classNames(styles.section, styles['list-section'])}>
          <List className={styles.list}>
            {categories
              .filter(({level}) => level === 1)
              .map(({id, level, name}, index) =>
                <ListItem key={index}>
                  <Link
                    className={classNames({
                      active: id === level1Id,
                    })}
                    to={`/categories/edit/${id}`}
                  >
                    {name}
                  </Link>
                </ListItem>
            )}
          </List>
        </div>
        <div className={classNames(styles.section, styles['list-section'])}>
          <List className={styles.list}>
            {categories
              .filter(({level, parentId}) =>
                level === 2 && parentId === level1Id
              )
              .map(({id, level, name}, index) =>
                <ListItem key={index}>
                  <Link
                    activeClassName="active"
                    to={`/categories/edit/${id}`}
                  >
                    {name}
                  </Link>
                </ListItem>
            )}
          </List>
        </div>
        {children}
      </div>
    </main>
  );
};


Categories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      level: PropTypes.number.isRequired,
      parentId: PropTypes.string,
      name: PropTypes.string.isRequired,
    })
  ),
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    parentId: PropTypes.string,
    name: PropTypes.string.isRequired,
  }),
  children: PropTypes.node,
};

function queryCategories() {
  return this::switchMap(() => api.categories.$fetchAll())
    ::filter(({success}) => success)
    ::map(({output}) => output)
    ::publishReplay(1).refCount();
}

const provideUniversalObservables = ({props$}) => ({
  categories$: props$::queryCategories(),
});

const provideObservables = ({categories$, props$}) => {
  categories$ = mergeStatic(
      categories$,
      mergeStatic(
        api.categories.created$,
        api.categories.updated$,
        api.categories.deleted$,
      )::queryCategories()
  )::startWith([]);

  const keywords$ = categories$
    ::map(categories =>
      Array.from(new Set(categories.reduce((all, {keywords}) =>
        all.concat(keywords), []
      )))
    )
    ::startWith([]);

  const category$ = categories$
    ::combineLatest(
      props$
        ::map(({params: {categoryId}}) => categoryId)
        ::distinctUntilChanged(),
      (categories, categoryId) =>
        categories.find(({id}) => categoryId === id)
    );

  return {
    categories$,
    category$,
    keywords$,
  };
};

export default compose(
  universalProvide(provideUniversalObservables),
  provide(provideObservables),
  connect(({
    categories$,
    category$,
  }) => ({
    categories: categories$,
    category: category$,
  })),
  withStyles(styles)
)(Categories);
