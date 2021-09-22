# Pip, Virtualenv, and Pipenv

| Python tool   | Node.js equivalent      |
|:------------- |:----------------------- |
| pyenv	        | nvm                     |
| pip           | npm --global            |
| virtualenv    | nvm + node_modules      |
| pipenv        | npm + nvm               |
| Pipfile       | package.json            |

Review the environment variables set in the shell profile.

```shell
pytest
```

Show that you cannot run **pytest**.

Create a virtual environment tied to a specific Python version.

```shell
pipenv install --python "$PYENV_ROOT/versions/3.8.1/bin/python"
```

Explore the file structure.

Review the `Pipfile`'s contents.

```shell
python --version
pipenv shell
python --version
which python
```

Show the version changes and now uses the shim in the `.venv` directory.

```shell
pipenv install pytest
```

Review the content of the `Pipfile` and the `Pipfile.lock`.

Show the packages were added to `.venv`.

Show that you can now run **pytest** from the command line.

```shell
exit
```

Note that the command prompt changed.

Show that you cannot run **pytest**, now. It's in the virtual environment, not
in the one that you're using now.
