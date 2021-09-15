import createGenericServerApi from './createGenericServerApi';
import api from '~/server/api/admin';

export default ({req}) => ({
  me() {
    return api.me({req});
  },

  activities: createGenericServerApi('activities', {api}),
  categories: createGenericServerApi('categories', {api}),
  pictures: createGenericServerApi('pictures', {api}),
});
