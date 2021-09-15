FROM node:14-slim

LABEL "com.github.actions.name"="Pull & Push"
LABEL "com.github.actions.description"="Pull data and push to AWS"
LABEL "com.github.actions.icon"="upload"
LABEL "com.github.actions.color"="purple"

ADD package.json /package.json
ADD yarn.lock /yarn.lock

ADD index.js /index.js
ADD graphql.js /graphql.js

RUN yarn

ENTRYPOINT [ "node", "/index.js" ]
