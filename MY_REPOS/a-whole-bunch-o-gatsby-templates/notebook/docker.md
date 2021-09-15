
### pull

```
docker pull [image name]
```

### images

```
docker images
```

### run

```
docker run [image name]
```
```
docker run [image name] echo "hello from busybox"
```
```
docker run -it [image name] sh
```

```
docker run [image name] --rm
```
automatically deletes the container once it's exited from

```
docker run -d --name [container-name] [image name]
```
runs detatched container under given name

### ps
```
docker ps
```
shows all running containers

```
docker ps -a
```
shows all containers that we ran

### rm
```
docker rm [container id]
```
remove container with given id

```
docker rm $(docker ps -a -q -f status=exited)
```
removes all exited containers

### prune
```
docker container prune
```
removes all stopped containers
___



- [docker-curriculum](https://docker-curriculum.com/)
