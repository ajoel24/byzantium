pipeline {
  agent any

  parameters {
    gitParameter(branchFilter: 'origin/(.*)', defaultValue: 'master', name: 'BRANCH', type: 'PT_BRANCH')
    booleanParam(name: 'buildBaseImage', defaultValue: true, description: 'Build base image')
    booleanParam(name: 'buildApi', defaultValue: false, description: 'Build API')
    booleanParam(name: 'buildUi', defaultValue: false, description: 'Build UI')
  }

  stages {
    stage('Demo') {
      when {
        expression {
          params.buildBaseImage
        }
      }
      steps {
        script {
          hello()
        }
      }
    }
  }
}

def hello() {
  sh 'echo hello'
}