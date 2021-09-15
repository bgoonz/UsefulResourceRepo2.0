import { Emojimood, EmojimoodMutation, EmojimoodQuery } from './Emojimood'
import { Mutation } from './Mutation'
import { User, Profile, UserMutation, UserQuery } from './User'
import { Venue, VenueDetails } from './Venue'
import { Query } from './Query'

export const resolvers = {
  Query,
  Mutation,
  User,
  Profile,
  Emojimood,
  EmojimoodMutation,
  EmojimoodQuery,
  UserMutation,
  UserQuery,
  Venue,
  VenueDetails,
}
