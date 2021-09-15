# ec2tail

Tail logs on remote EC2 servers.

# Usage

1. create a .env folder with the appropriate credentials
  * you can use `.env.example` as a starting point.
2. on your remote servers, create a `~/.log` file.
  * The `.log` file should list all the logs you're interested in tailing remotely.
3. place a `Name` tag to your ec2 instances
  * this should have a sane-human-readable :tm: description of your remote server.
4. run `ec2tail list-servers`, to retrieve a list of your servers.
5. run `ecttail -f server-name`, to tail the remote logs listed in the `~/.log` file.
