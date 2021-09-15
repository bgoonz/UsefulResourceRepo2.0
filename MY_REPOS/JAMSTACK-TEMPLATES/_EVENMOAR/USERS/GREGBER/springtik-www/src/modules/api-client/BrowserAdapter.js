import createGenericBrowserApi from './createGenericBrowserApi';

export default ({http}) => ({
  me() {
    return http.get('/api/me')
      .then(({bodyData}) => bodyData);
  },

  activities: createGenericBrowserApi('activities', {http}),
  categories: createGenericBrowserApi('categories', {http}),
  pictures: createGenericBrowserApi('pictures', {http}),
});
