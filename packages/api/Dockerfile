FROM ajoel24/byzantium-base:latest

ARG NODE_ENV

ENV NODE_ENV ${NODE_ENV}

WORKDIR /usr/src/app

COPY ./ ./packages/api

RUN npx lerna bootstrap

RUN npm run build:api

EXPOSE 1337

CMD ["npm", "run", "develop:api"]