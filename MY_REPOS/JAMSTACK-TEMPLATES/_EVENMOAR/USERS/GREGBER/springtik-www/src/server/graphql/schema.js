import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql/type';
import activityType, {resolve as resolveActivity} from './activityType';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      activity: {
        type: activityType,
        args: {
          id: {type: GraphQLString},
        },
        resolve: resolveActivity,
      },
    },
  }),
});
