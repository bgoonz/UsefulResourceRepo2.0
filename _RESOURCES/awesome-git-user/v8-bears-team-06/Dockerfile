FROM node:11.11.0-alpine
ENV APP_DIR /app

RUN mkdir ${APP_DIR}
COPY . ${APP_DIR}/
WORKDIR ${APP_DIR}
RUN npm ci

EXPOSE 3000

CMD ["npm", "start"]
