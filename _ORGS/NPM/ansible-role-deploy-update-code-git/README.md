Ansible deploy-update-code-git
==============================

This role creates new release directory, clones your git repository and creates symlinks for some shared stuff (like logs and assets).

For more information about deployment setup see this [overview](https://github.com/kunik/ansible-role-deploy-metadata/blob/master/USAGE.md)

Requirements
------------

No

Role Variables
--------------

```
deploy_update_code_git:
  repository: git@github.com/user/repo.git
  version: HEAD

deploy_update_code_git_defaults:
  logs_path: log
  assets_path: public/assets
```

Basically you should redefine only `deploy_update_code_git`


Dependencies
------------

No

License
-------

BSD
