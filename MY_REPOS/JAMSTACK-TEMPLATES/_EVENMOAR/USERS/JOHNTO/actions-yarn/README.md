# GitHub Action for Yarn and Lerna

This Action is a light wrapper around yarn and lerna.
It uses the circleci/node:10 image because it has git as a dependency which lerna needs.

## Usage

```tf
workflow "Publish to npm" {
  on = "push"
  resolves = ["johno/actions-yarn@master-1"]
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@b2bea07"
  args = "branch master"
}

action "johno/actions-yarn@master" {
  uses = "johno/actions-yarn@master"
  needs = ["Filters for GitHub Actions"]
  args = "install"
}

action "johno/actions-yarn@master-1" {
  uses = "johno/actions-yarn@master"
  needs = ["johno/actions-yarn@master"]
  secrets = ["NPM_AUTH_TOKEN", "GITHUB_TOKEN"]
  args = "publish:ci"
}
```

## Related

- https://github.com/nuxt/actions-yarn
