FROM node:10-alpine

COPY . /cabal-irc

VOLUME /data
WORKDIR /cabal-irc

RUN apk add --no-cache --virtual .build \
  build-base autoconf libtool automake python \
  && npm install -g . \
  && apk del .build

ENV CABAL_STORE="/data/" \
    CABAL_HOST="0.0.0.0"

ENTRYPOINT ["/usr/local/bin/cabal-irc"]
