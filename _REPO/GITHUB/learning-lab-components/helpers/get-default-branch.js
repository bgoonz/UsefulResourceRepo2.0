module.exports = function getDefaultBranch (context) {
  return context.payload.repository.default_branch
}
