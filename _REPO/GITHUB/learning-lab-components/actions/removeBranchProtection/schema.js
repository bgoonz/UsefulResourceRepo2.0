const Joi = require('@hapi/joi')

module.exports = Joi.object({
  branch: Joi.string()
    .meta({ label: 'Branch' })
    .description('The name of the branch to remove protection from. This will be the repo\'s default branch if none was provided.')
})
  .description('Removes the branch protection on a branch in the course repository')
  .example([
    {},
    { context: 'Remove branch protection from the default branch:' }
  ])
  .example([
    { branch: 'my-protected-branch' },
    { context: 'Remove branch protection from a specific branch:' }
  ])
