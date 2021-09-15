import ApiError from '~/modules/ApiError';
import {FETCH_NOT_FOUND} from '~/modules/apiErrors';

export default (Model, {
  allowEager = '',
} = {}) => ({
  fetchAll({where, eager} = {}) {
    const query = Model.query()
      .allowEager(allowEager)
      .eager(eager)
      .orderBy('id', 'desc');

    if (where && Object.keys(where).length)
      return query.where(where);

    return query;
  },

  fetch(id) {
    return Model.query().where({id})
      .then(([res]) => {
        if (!res)
          throw new ApiError('Result not found', FETCH_NOT_FOUND, 404);

        return res;
      });
  },

  create(model) {
    return Model
      .query()
      .insertWithRelated(model);
  },

  update({id, ...data}) {
    return Model.query().patchAndFetchById(id, data);
  },

  delete(id) {
    return Model.query().delete().where({id});
  },
});
