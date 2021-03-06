import * as core from '@actions/core';
import * as github from '@actions/github';
import * as Octokit from '@octokit/rest';

type Issue = Octokit.IssuesListForRepoResponseItem;
type IssueLabel = Octokit.IssuesListForRepoResponseItemLabelsItem;

type Args = {
  repoToken: string;
  staleIssueMessage: string;
  stalePrMessage: string;
  daysBeforeStale: number;
  daysBeforeClose: number;
  staleIssueLabel: string;
  exemptIssueLabels: string[];
  stalePrLabel: string;
  exemptPrLabels: string[];
  operationsPerRun: number;
};

async function run() {
  try {
    const args = getAndValidateArgs();

    const client = new github.GitHub(args.repoToken);
    await processIssues(client, args, args.operationsPerRun);
  } catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}

async function processIssues(
  client: github.GitHub,
  args: Args,
  operationsLeft: number,
  page: number = 1
): Promise<number> {
  const issues = await client.issues.listForRepo({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    state: 'open',
    per_page: 100,
    page: page
  });

  operationsLeft -= 1;

  if (issues.data.length === 0 || operationsLeft === 0) {
    return operationsLeft;
  }

  for (const issue of issues.data.values()) {
    core.debug(`found issue: ${issue.title} (${issue.number}) ― last updated ${issue.updated_at}`);
    let isPr = !!issue.pull_request;

    // If no stale message for issue/PR is defined, skip it
    let staleMessage = isPr ? args.stalePrMessage : args.staleIssueMessage;
    if (!staleMessage) {
      core.debug(`skipping ${isPr ? 'pr' : 'issue'} due to empty stale message in the action's config`);
      continue;
    }

    // If the issue has at least one assignee, skip it
    if (issue.assignee !== null && issue.assignees.length >= 1) {
      core.debug(`skipping ${isPr ? 'pr' : 'issue'} because at least one person is assigned`);
      continue;
    }

    let staleLabel = isPr ? args.stalePrLabel : args.staleIssueLabel;
    let exemptLabels = isPr ? args.exemptPrLabels : args.exemptIssueLabels;

    // Check if at least one label is present
    if (exemptLabels.some(exemptLabel => isLabeled(issue, exemptLabel))) {
      continue;
    } else if (isLabeled(issue, staleLabel)) {
      // Check if the staleLabel is present. If yes, close the issue
      if (wasLastUpdatedBefore(issue, args.daysBeforeClose)) {
        operationsLeft -= await closeIssue(client, issue);
      } else {
        continue;
      }
    } else if (wasLastUpdatedBefore(issue, args.daysBeforeStale)) {
      // Check if the last update on the issue is longer than the stale days
      operationsLeft -= await markStale(
        client,
        issue,
        staleMessage,
        staleLabel
      );
    }

    if (operationsLeft <= 0) {
      core.warning(
        `performed ${args.operationsPerRun} operations, exiting to avoid rate limit`
      );
      return 0;
    }
  }
  return await processIssues(client, args, operationsLeft, page + 1);
}

function isLabeled(issue: Issue, label: string): boolean {
  const labelComparer: (l: IssueLabel) => boolean = l =>
    label.localeCompare(l.name, undefined, {sensitivity: 'accent'}) === 0;
  return issue.labels.filter(labelComparer).length > 0;
}

function wasLastUpdatedBefore(issue: Issue, num_days: number): boolean {
  const daysInMillis = 1000 * 60 * 60 * 24 * num_days;
  const millisSinceLastUpdated =
    new Date().getTime() - new Date(issue.updated_at).getTime();
  return millisSinceLastUpdated >= daysInMillis;
}

async function markStale(
  client: github.GitHub,
  issue: Issue,
  staleMessage: string,
  staleLabel: string
): Promise<number> {
  core.debug(`marking issue${issue.title} as stale`);

  await client.issues.createComment({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: issue.number,
    body: staleMessage
  });

  await client.issues.addLabels({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: issue.number,
    labels: [staleLabel]
  });

  return 2; // operations performed
}

async function closeIssue(
  client: github.GitHub,
  issue: Issue
): Promise<number> {
  core.debug(`closing issue ${issue.title} for being stale`);

  await client.issues.update({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: issue.number,
    state: 'closed'
  });

  return 1; // operations performed
}

function getAndValidateArgs(): Args {
  const args = {
    repoToken: core.getInput('repo-token', {required: true}),
    staleIssueMessage: core.getInput('stale-issue-message'),
    stalePrMessage: core.getInput('stale-pr-message'),
    daysBeforeStale: parseInt(
      core.getInput('days-before-stale', {required: true})
    ),
    daysBeforeClose: parseInt(
      core.getInput('days-before-close', {required: true})
    ),
    staleIssueLabel: core.getInput('stale-issue-label', {required: true}),
    exemptIssueLabels: (core.getInput(
      'exempt-issue-labels'
    ) as unknown) as string[],
    stalePrLabel: core.getInput('stale-pr-label', {required: true}),
    exemptPrLabels: (core.getInput('exempt-pr-labels') as unknown) as string[],
    operationsPerRun: parseInt(
      core.getInput('operations-per-run', {required: true})
    )
  };

  for (const numberInput of [
    'days-before-stale',
    'days-before-close',
    'operations-per-run'
  ]) {
    if (isNaN(parseInt(core.getInput(numberInput)))) {
      throw Error(`input ${numberInput} did not parse to a valid integer`);
    }
  }

  return args;
}

run();
