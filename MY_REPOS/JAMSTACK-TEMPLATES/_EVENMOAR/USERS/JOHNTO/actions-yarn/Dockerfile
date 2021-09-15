FROM node:11-slim

LABEL version="1.0.0"
LABEL repository="https://github.com/johno/actions-yarn"
LABEL homepage="https://github.com/johno/actions-yarn"
LABEL maintainer="John Otander <johnotander@gmail.com>"

LABEL com.github.actions.name="GitHub Action for Yarn and Lerna"
LABEL com.github.actions.description="Wraps the yarn CLI and adds git for lerna"
LABEL com.github.actions.icon="package"
LABEL com.github.actions.color="purple"

RUN yarn config set unsafe-perm true

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git

COPY "entrypoint.sh" "/entrypoint.sh"
ENTRYPOINT ["/entrypoint.sh"]
CMD ["help"]
