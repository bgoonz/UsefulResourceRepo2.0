const getDefaultBranch = require('../../helpers/get-default-branch')

module.exports = async (context, opts) => {
  return context.github.repos.updateBranchProtection(context.repo({
    branch: opts.branch || getDefaultBranch(context),
    enforce_admins: opts.enforce_admins || true,
    required_status_checks: opts.required_status_checks || null,
    required_pull_request_reviews: opts.required_pull_request_reviews || {},
    restrictions: opts.restrictions || null
  }))
}
