FROM node:12.4-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json package.json
RUN npm install && mv node_modules /node_modules

COPY . .

LABEL maintainer="Eyal Sofer"

#define Env variable
ARG RUN_NUM
ENV BUILD_NUM=$RUN_NUM

CMD node app.js
