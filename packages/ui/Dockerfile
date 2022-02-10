FROM ajoel24/byzantium-base:latest

WORKDIR /usr/src/app

COPY ./ ./packages/ui

RUN npx lerna bootstrap

RUN npm run build:ui

EXPOSE 80

CMD ["npm", "run", "dev:ui"]