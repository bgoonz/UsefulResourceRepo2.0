# RDerby

rolling restarts using HAProxy, ndm, and some elbow grease.

## Usage

```
rderby roll newww:8080 newww-1:8081 newww-2:8082
```

## How does it work?

1. the server is removed from HAProxy using the HAProxy API.
2. ndm is used to restart the service.
3. we wait for the service's port to start serving 200s.
4. the server is added back to HAProxy.
