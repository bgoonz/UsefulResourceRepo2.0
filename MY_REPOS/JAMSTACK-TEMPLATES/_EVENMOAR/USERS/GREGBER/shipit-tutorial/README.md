# hello-world

Demo project for Shipit tutorial.

## Set up remote server

Create the remote user:

```
useradd deploy -m
```

Enable ssh with our authorized key:

```
mkdir /home/deploy/.ssh
cat my_id_rsa.pub >> /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

Create the deploy directory:

```
mkdir -p /usr/src/hello-world
chown deploy:deploy /usr/src/hello-world
```