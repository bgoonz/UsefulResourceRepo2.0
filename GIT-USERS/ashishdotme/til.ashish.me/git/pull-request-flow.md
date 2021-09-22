# Pull request flow

```shell
# 1. Create a “branch” (version)
git checkout -b feature_x

# 2. Commit and push the changes
git push origin <branch>

# 3. Open a “pull request”, rebase and tests
git rebase master

# 6. “Merge” your branch to the master branch
git checkout master
git merge <branch> --no-ff

# 7. Tag
git tag -a v1.3.0 -m "ashish.me v1"
```
