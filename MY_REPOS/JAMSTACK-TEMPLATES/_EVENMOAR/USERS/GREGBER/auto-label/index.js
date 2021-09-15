function getActiveLabels(config, commits) {
  const types = Object.entries(config.types).map(([label, value]) => ({
    label,
    regexp: new RegExp(value)
  }));

  return commits.reduce((labels, commit) => {
    function addLabel(label) {
      if (!labels.includes(label)) {
        labels.push(label);
      }
    }

    types.forEach(type => {
      if (type.regexp.test(commit.commit.message)) {
        addLabel(type.label);
      }
    });

    return labels;
  }, []);
}

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  app.on(
    ["pull_request.opened", "pull_request.edited", "pull_request.synchronize"],
    async context => {
      const config = await context.config(`auto-label.yml`, { types: {} });
      const { owner, repo } = context.repo();
      const {
        payload: {
          pull_request: { number, labels: prLabels }
        }
      } = context;
      const { data: commits } = await context.github.pulls.listCommits({
        owner,
        repo,
        pull_number: number
      });
      const activeLabels = getActiveLabels(config, commits);
      const oldLabels = prLabels.map(label => label.name);
      const upToDate = activeLabels.every(label => oldLabels.includes(label));
      if (upToDate) return;
      const newLabels = Array.from(new Set([...oldLabels, ...activeLabels]));
      await context.github.issues.addLabels({
        owner,
        repo,
        issue_number: number,
        labels: newLabels
      });
    }
  );
};
