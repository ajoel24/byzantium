def modules = [: ]

pipeline {
  agent any

  options {
    skipDefaultCheckout true
    buildDiscarder(logRotator(numToKeepStr:'1'))
  }

  parameters {
    gitParameter(branchFilter: 'origin/(.*)', defaultValue: 'master', name: 'BRANCH', type: 'PT_BRANCH')
    string(name: 'githubUser', defaultValue: 'ajoel24', description: 'Enter GitHub username')
    string(name: 'githubRepository', defaultValue: 'byzantium', description: 'Enter repository name')
    string(name: 'configFileId', defaultValue: 'byzantium-config', description: 'Enter ID of config file')
    booleanParam(name: 'buildBaseImage', defaultValue: true, description: 'Build base image')
    booleanParam(name: 'buildApiImage', defaultValue: false, description: 'Build API image')
    booleanParam(name: 'deployApiImage', defaultValue: false, description: 'Deploy API image')
    booleanParam(name: 'buildUi', defaultValue: false, description: 'Build UI')
  }

  stages {
    stage('Pre Build') {
      steps {
        // Delete existing workspace
        deleteDir()

        // Load config file into environment
        configFileProvider([configFile(fileId: params.configFileId, targetLocation: 'config.groovy', variable: 'configFile')]) {
          load "config.groovy"
        }
      }
    }

    stage('SCM Checkout') {
      steps {
        script {
          withCredentials([string(credentialsId: GITHUB_PAT_CREDENTIALS_ID, variable: 'TOKEN')]) {
            git branch: "${params.BRANCH}", url: "https://${TOKEN}@github.com/${params.githubUser}/${params.githubRepository}.git"
          }
        }
      }
    }

    stage('Load Groovy modules') {
      steps {
        script {
          // Load modules
          modules.baseImage = load("${GROOVY_SCRIPTS_PATH}/BaseImage.groovy")
          modules.common = load("${GROOVY_SCRIPTS_PATH}/Common.groovy")
          modules.apiImage = load("${GROOVY_SCRIPTS_PATH}/ApiImage.groovy")
        }
      }
    }

    stage('Build base image') {
      when {
        expression {
          params.buildBaseImage
        }
      }
      steps {
        script {
          modules.baseImage.buildBaseImage()
        }
      }
    }

    stage('Build API image') {
      when {
        expression {
          params.buildApiImage
        }
      }
      steps {
        script {
          modules.apiImage.buildApiImage()
        }
      }
    }

    stage('Deploy API image') {
      when {
        expression {
          params.deployApiImage
        }
      }
      steps {
        script {
          modules.apiImage.deployApiImage()
        }
      }
    }
  }

  post {
    always {
      cleanWs()
    }
    success {
      script {
        modules.common.logBuildSuccess()
      }
    }
  }
}