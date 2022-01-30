def buildBaseImage() {
  sh "echo [INFO] Building Base image"

  // Build image
  def dockerImage = docker.build(BASE_IMAGE_REGISTRY, "--build-arg NODE_VERSION=\$(cat .nvmrc | tr -cd [:digit:].) .")

  // Push image to Docker Hub
  docker.withRegistry(DOCKER_HUB_REGISTRY, DOCKER_HUB_CREDENTIALS_ID) {
    dockerImage.push(BUILD_NUMBER)
    dockerImage.push("latest")
  }

  sh "echo [INFO] Base image built successfully"
}

return this