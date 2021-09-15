FROM node:9.2

RUN useradd --user-group --create-home --shell /bin/false app
ENV HOME=/home/app

COPY . $HOME/src
RUN chown -R app:app $HOME/*

# Disabled in dev, as it creates access issues for host:
# USER app

WORKDIR $HOME/src
RUN yarn install

EXPOSE 3001

# CMD npm run _production

