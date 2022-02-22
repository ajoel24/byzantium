#!/bin/bash
cp .env.development .env

docker build \
  --build-arg NODE_ENV=developemnt \
  -t ajoel24/local-api \
  .
 
docker run \
  -p "1337:1337" \
  --env-file .env \
  --network byzantium_network \
  ajoel24/local-api
