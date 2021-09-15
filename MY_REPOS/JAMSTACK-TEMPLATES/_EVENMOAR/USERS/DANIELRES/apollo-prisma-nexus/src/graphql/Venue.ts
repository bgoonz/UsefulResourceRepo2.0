import { extendType, intArg, objectType, stringArg } from '@nexus/schema'

export const Venue = objectType({
  name: 'Venue',
  definition(t) {
    t.model.id()
    t.model.VenueDetails({ type: 'VenueDetails' })
  },
})

export const VenueDetails = objectType({
  name: 'VenueDetails',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.description()
  },
})

export const VenueAdministration = objectType({
  name: 'VenueAdministration',
  definition(t) {
    t.model.id()
    t.model.admins()
    t.model.venue()
  },
})
