# Docker-Node-React test project

Warning: this Readme is outdated. Stay tuned for updates !

This project is a personal experiment for running a javascript app with decoupled frontend and backend using Docker.

The whole application is composed of several independent layers assembled together using docker-compose:

- in all environments:

  - the `web` container is the core of the application
  - the `db` container provides a postgresql database

- in production only:
  - `https-portal` enables https on the whole application
  - the `auth` container has to be used on a subdomain of the app, and provides authentication using various providers like Facebook

This whole stack can be executed locally for development and remotely in production using `docker-compose` commands.
In production, this whole stack can be hosted for example on Digital Ocean's cheapest instance (5$/month).

This might hopefully become a very convenient base for rapid development of simple applications with a small amount of users, with the ability to scale up easily if necessary.

The app is composed of:

- a `web` container with:
  - a frontend (create-react-app)
  - a backend (express.js)
- a `db` container (postgres)

And, in production:

- an `https-portal` enabling https for the whole app
- `login-with`: a microservice in charge of Facebook authentication (can easily configured for more auth providers like Google, Twitter, ...)

Deployment:

- [TODO]

## Configuration:

The app needs a number of environment variables to be set:

- used in all environments:

  - `PGPASSWORD`
  - `PGUSER`
  - `PGDB`

- used in production only:
  - `HTTPSDOMAINS`
  - `LW_JWT_SECRET`
  - `LW_SESSION_SECRET`
  - `LW_SUBDOMAIN`
  - `LW_FACEBOOK_APPID`
  - `LW_FACEBOOK_APPSECRET`

In development, these needed env variables are set automatically, reading from the `.env` file.

In production, you need to define these variables yourself.

Here is an example launch command for production:

```bash
PGPASSWORD="myDbPassword" \
PGUSER="myDbUser" \
PGDB="myDbName" \
HTTPSDOMAINS="mydomain.com -> http://web:3001, login.mydomain.com -> http://auth:3000" \
LW_JWT_SECRET="someComplicatedString" \
LW_SESSION_SECRET="someOtherComplicatedString" \
LW_SUBDOMAIN="login.mydomain.com" \
LW_FACEBOOK_APPID="123444445555555" \
LW_FACEBOOK_APPSECRET="js4nvt3eog7mp49042240f350790be3e" \
docker-compose -f docker-compose.production.yml up
```

## Setting up the Docker host

Recommended host system: a Digital Ocean's standard droplet with Ubuntu 14.04. (newer Ubuntu versions are not well suppoprted by `docker-machine`)

If you want to use a minimal Digital Ocean droplet for 5$/month (512 mb RAM, 20Gb Disk).

`docker-machine create --driver digitalocean --digitalocean-access-token=YOUR_DIGITALOCEAN_ACCESS_TOKEN --digitalocean-size 512mb YOUR_DOCKER_MACHINE_NAME`

This is the cheapest option available and comes with limitations that require some little tweaks. The main problem is that the droplet doesn't have enough RAM to be able to complete the `npm install` (or `yarn install`) command.

Luckily, they provide more than enough hard disk space for us to set up a 1Gb swapfile, which solves our probem.

### Setting up the swapfile (tested on the Digital Ocean Ubuntu 14.04 droplet):

Access the host's terminal through ssh, then run the following command on the host:

`fallocate -l 1G /swapfile && chmod 600 /swapfile && mkswap /swapfile && sudo swapon /swapfile && swapon --show`

With `docker-machine`, from your own machine:

`docker-machine ssh YOUR_DOCKER_MACHINE_NAME "fallocate -l 1G /swapfile && chmod 600 /swapfile && mkswap /swapfile && sudo swapon /swapfile && swapon --show"`

This will create the swapfile needed for the build to complete.

## Running commands through Docker

- [TODO, but in short: check package.json for ready to use npm scripts going through Docker]
