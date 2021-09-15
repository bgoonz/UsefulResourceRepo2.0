# npmE Ansible

npmE Ansible installs OS-specific dependencies for npm Enteprise:

* Nginx.
* CouchDB.
* Redis.
* Node.js.

# Usage

_npmE Ansible_ uses the Ansible deployment tool to install the dependencies for npmE on a fresh vm.

1. ensure that Ansible is installed on your remote server.
2. update the `inventory` file to point to the remote server in question.
3. run `ansible-playbook ./deploy.yml -i inventory` to setup the remote server.

# Passwordless sudo

Ansible expects to be able to run with passwordless sudo.

That's all there is to it! patches welcome.
