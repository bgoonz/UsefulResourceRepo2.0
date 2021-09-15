const Joi = require('@hapi/joi')

module.exports = Joi.object({
  issue: Joi.alternatives().try(Joi.number(), Joi.string())
    .meta({ label: 'Issue' })
    .description('The number or title of the issue to reopen.')
})
  .description('Reopens a closed issue on GitHub. Will not negatively affect an open issue.')
  .example([
    {},
    { context: 'Use the issue from the webhook payload:' }
  ])
  .example([
    { issue: 'Title of an issue' },
    { context: 'Use the title of an issue:' }
  ])
  .example([
    { issue: 4 },
    { context: 'Use an issue number:' }
  ])
