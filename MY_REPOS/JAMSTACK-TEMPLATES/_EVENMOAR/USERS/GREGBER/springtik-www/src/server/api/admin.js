import gravatar from 'gravatar';
import createApiFromModel from '~/server/utils/createApiFromModel';
import Activity from '~/server/models/Activity';
import Category from '~/server/models/Category';
import Location from '~/server/models/Location';
import Picture from '~/server/models/Picture';

export default ({
  me({req}) {
    return Promise.resolve({
      ...req.user,
      avatar200x200: gravatar.url(req.user.email, {s: '200', d: 'retro'}),
    });
  },

  pictures: createApiFromModel(Picture),

  activities: {
    ...createApiFromModel(Activity),
    async update({id, ...data}) {
      if (data.location) {
        if (data.location.id) {
          await Location
            .query()
            .where({id: data.locationId})
            .patch(data.location);
        } else {
          ({id: data.locationId} = await Location
            .fromJson(data.location)
            .$query()
            .insert()
          );
        }
      }

      return await Activity
        .query()
        .patchAndFetchById(id, data);
    },
  },
  categories: createApiFromModel(Category),
});
