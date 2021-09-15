FROM node:12.13.1

ENV APP_DIR /src/app

RUN mkdir -p $APP_DIR

WORKDIR ${APP_DIR}

ADD ./package.json .

RUN npm install

COPY . .

RUN chown -R node:node .

USER node
