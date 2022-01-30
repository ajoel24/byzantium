#!/bin/bash
while getopts ":i:e:" opt; do
  case $opt in
    i) image="$OPTARG"
    ;;
    e) env_file="$OPTARG"
    ;;
    \?) echo "Invalid option -$OPTARG" >&2
    exit 1
    ;;
  esac

  case $OPTARG in
    -*) echo "Option $opt needs a valid argument"
    exit 1
    ;;
  esac
done

docker container stop strapi || true && \
docker container rm -f strapi || true  && \
docker rmi $image || true && \
docker run \
        --name strapi \
        --network byzantium_network \
        --env-file $env_file \
        -p "1337:1337" \
        -d \
        $image