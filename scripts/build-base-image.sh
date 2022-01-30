cd .. && \
docker build \
    --build-arg NODE_VERSION=$(cat .nvmrc | tr -cd [:digit:].) \
    -f Dockerfile \
    -t ajoel24/byzantium-base:${}
    .