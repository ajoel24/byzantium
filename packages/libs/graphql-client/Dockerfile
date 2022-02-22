FROM ajoel24/byzantium-base:latest

WORKDIR /usr/src/app

COPY . ./packages/libs/graphql-client

RUN npx lerna bootstrap

RUN npm run build:libs:graphql-client
