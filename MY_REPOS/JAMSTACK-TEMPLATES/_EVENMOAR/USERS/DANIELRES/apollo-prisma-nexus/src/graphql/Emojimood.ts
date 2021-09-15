import { extendType, intArg, objectType, stringArg } from '@nexus/schema'
import * as nexus from '@nexus/schema'

export const Emojimood = objectType({
  name: 'Emojimood',
  definition(t) {
    t.model.id()
    t.model.colorOne()
    t.model.colorTwo()
    t.model.Profile()
  },
})

export const EmojimoodMutation = nexus.extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneEmojimood({ alias: 'createEmojimood' })
  },
})

export const EmojimoodQuery = nexus.extendType({
  type: 'Query',
  definition(t) {
    t.crud.emojimoods({ alias: 'allEmojimoods' })
  },
})
