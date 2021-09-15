const getDefaultBranch = require('../../helpers/get-default-branch')

module.exports = async (context, opts) => {
  return context.github.repos.removeBranchProtection(context.repo({
    branch: opts.branch || getDefaultBranch(context)
  }))
}
