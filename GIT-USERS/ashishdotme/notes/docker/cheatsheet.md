---
id: cheatsheet
title: Cheatsheet
---

```sh
# Run a container based on a docker image
docker run -d nginx # -d for running in background
docker run -d --name ashishdotme-nginx -p 9090:80 nginx:latest # expose 80 port from the container and map it to 9090
docker run -d --name ashishdotme-nginx -p 80 nginx:latest # expose 80 port to randomly available port
docker port ashishdotme-nginx 80 # find the port of host machine to binded to 80
docker run -d --name ashishdotme-nginx -p 80 -v c:\nginx:/data nginx:latest # mount host storage for persistent container

# Get details about running container
docker inspect ashishdotme-nginx

# Get logs from a container
docker logs ashishdotme-nginx

# Stop services only
docker-compose stop

# Stop and remove containers, networks..
docker-compose down

# Down and remove volumes
docker-compose down --volumes

# Down and remove images
docker-compose down --rmi <all|local>

# Starts the container and leaves them running
docker-compose up -d
```
