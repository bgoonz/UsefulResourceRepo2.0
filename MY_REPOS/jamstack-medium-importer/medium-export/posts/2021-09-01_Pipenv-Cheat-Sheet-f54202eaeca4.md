# Pipenv Cheat Sheet

Pipenv Cheat Sheet

---

### Pipenv Cheat Sheet

#### Pipenv Cheat Sheet

<figure><img src="https://cdn-images-1.medium.com/max/800/0*_cMetdwtiZQ2nJNj.jpg" class="graf-image" /></figure>### Install pipenv

    pip3 install pipenv

### Activate

    pipenv shell

### Check version of Python

    python --version

### Check path

    python
    >>> import sys
    >>> sys.executable
    quit()

### Install a package

    pipenv install camelcase

### Check local packages

    pipenv lock -r

### Uninstall a package

    pipenv uninstall camelcase

### Install a dev package

    pipenv install nose --dev

### Install from requirements.txt

    pipenv install -r ./requirements.txt

### Check security vulnerabilities

    pipenv check

### Check dependency graph

    pipenv graph

### Ignore pipfile

    pipenv install --ignore-pipfile

### Set lockfile — before deployment

    pipenv lock

### Exiting the virtualenv

    exit

### Run with pipenv

    pipenv run *

By <a href="https://medium.com/@bryanguner" class="p-author h-card">Bryan Guner</a> on [September 1, 2021](https://medium.com/p/f54202eaeca4).

<a href="https://medium.com/@bryanguner/pipenv-cheat-sheet-f54202eaeca4" class="p-canonical">Canonical link</a>

Exported from [Medium](https://medium.com) on September 12, 2021.
