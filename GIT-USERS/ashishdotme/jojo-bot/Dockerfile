FROM node:14-alpine
WORKDIR /opt/build
LABEL name "bot image builder"

COPY package*.json tsconfig.json ./
RUN npm ci
COPY src src/
RUN npm run build
RUN npm prune --production

FROM node:14-alpine
LABEL name "Bot service"

WORKDIR /usr/app
COPY --from=0 /opt/build ./

CMD [ "npm", "start" ]

