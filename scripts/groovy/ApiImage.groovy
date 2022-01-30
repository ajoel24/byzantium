def buildApiImage() {
  sh "echo [INFO] Building API image"

  dir("packages/api") {
    // Build image
    def dockerImage = docker.build(API_IMAGE_REGISTRY, "--build-arg NODE_ENV=${API_NODE_ENV} .")

    // Push image to Docker Hub
    docker.withRegistry(DOCKER_HUB_REGISTRY, DOCKER_HUB_CREDENTIALS_ID) {
      dockerImage.push(BUILD_NUMBER)
      dockerImage.push("latest")
    }

    sh "echo [INFO] API image built successfully"
  }
}

def deployApiImage() {
  def remoteCredentials = "${DEPLOY_NODE_USER}@${DEPLOY_NODE_IP}"

  dir('scripts/docker') {
    sshagent([DEPLOY_SSH_CREDENTIAL_ID]) {
      configFileProvider([configFile(fileId: API_ENV_FILE_ID, targetLocation: '.env', variable: 'apiEnv')]) {
        sh "scp deploy-api.sh ${remoteCredentials}:${DEPLOY_API_DIR}/deploy-api.sh"
        sh "scp .env ${remoteCredentials}:${DEPLOY_API_DIR}/.env"
        sh "ssh ${remoteCredentials} 'bash ${DEPLOY_API_DIR}/deploy-api.sh -i ${API_IMAGE_REGISTRY} -e ${DEPLOY_API_DIR}/.env'"
      }
    }
  }
}

return this