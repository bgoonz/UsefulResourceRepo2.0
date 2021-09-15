FROM node:14-alpine

WORKDIR /usr/src/app

COPY yarn.lock .
COPY package.json .

RUN yarn --prod --frozen-lockfile

COPY . .

EXPOSE 3000

# Start the server within the container:
CMD [ "yarn", "start" ]
