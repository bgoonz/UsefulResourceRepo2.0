FROM ruby:2.4.1

MAINTAINER Filip Jerga <jerga99@gmail.com>

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

ENV INSTALL_PATH /dockerize-portfolio
RUN mkdir -p $INSTALL_PATH

WORKDIR $INSTALL_PATH

COPY Gemfile Gemfile

RUN bundle install --binstubs && bundle update

COPY . .

VOLUME ["$INSTALL_PATH/public"]
