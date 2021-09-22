<!--
  /!\ WARNING /!\
  This file's content is auto-generated, do NOT edit!
  All changes will be undone.
-->

# `reopenIssue`

Reopens a closed issue on GitHub. Will not negatively affect an open issue.

## Examples

Use the issue from the webhook payload:

```yaml
type: reopenIssue
```

Use the title of an issue:

```yaml
type: reopenIssue
issue: Title of an issue
```

Use an issue number:

```yaml
type: reopenIssue
issue: 4
```

## Options

| Title | Property | Description | Default | Required |
| :---- | :--- | :---------- | :------ | :------- |
| Issue | `issue` | The number or title of the issue to reopen. |  |  |

