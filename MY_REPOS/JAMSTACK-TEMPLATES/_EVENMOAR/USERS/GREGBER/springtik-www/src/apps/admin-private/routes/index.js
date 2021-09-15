/* eslint-disable react/jsx-key */
import React from 'react';
import Route from 'react-router/lib/Route';
import App from './App';
import Categories from './categories/Categories';
import CategoriesNew from './categories/CategoriesNew';
import CategoriesEdit from './categories/CategoriesEdit';
import Activities from './activities/Activities';
import ActivitiesNew from './activities/ActivitiesNew';
import ActivitiesEdit from './activities/ActivitiesEdit';

export default [
  <Route path="/" component={App}>
    <Route
      path="categories"
      component={Categories}
    >
      <Route path="new" component={CategoriesNew} />
      <Route path="edit/:categoryId" component={CategoriesEdit} />
    </Route>
    <Route
      path="activities"
      component={Activities}
    >
      <Route path="new" component={ActivitiesNew} />
      <Route path="edit/:activityId" component={ActivitiesEdit} />
    </Route>
  </Route>,
];
