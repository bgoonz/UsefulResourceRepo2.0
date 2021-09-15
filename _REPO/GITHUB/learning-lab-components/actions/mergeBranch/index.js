const getDefaultBranch = require('../../helpers/get-default-branch')

module.exports = async (context, opts) => {
  return context.github.repos.merge(context.repo({
    base: opts.base || getDefaultBranch(context),
    head: opts.head
  }))
}
