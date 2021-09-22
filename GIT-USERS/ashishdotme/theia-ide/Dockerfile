FROM ubuntu:18.04
RUN apt-get update && apt-get -y install curl xz-utils wget git sudo build-essential
RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
RUN sudo apt-get install -y nodejs
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
RUN sudo apt update && sudo apt install yarn
RUN apt-get update && apt-get install -y python python-pip
RUN pip install python-language-server
RUN apt-get -y install ruby ruby-dev zlib1g-dev
RUN gem install solargraph
RUN mkdir -p /home/project && mkdir -p /home/theia
WORKDIR /home/theia
ADD package.json ./package.json
RUN sudo yarn --cache-folder ./ycache && sudo rm -rf ./ycache
RUN NODE_OPTIONS="--max_old_space_size=8192" sudo yarn theia build
EXPOSE $PORT
