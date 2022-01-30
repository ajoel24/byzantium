ARG NODE_VERSION

FROM node:${NODE_VERSION}

WORKDIR /usr/src/app

COPY package.json package.json

COPY lerna.json lerna.json

RUN npm run bootstrap