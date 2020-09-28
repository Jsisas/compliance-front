pipeline {
  agent {
    docker {
      image 'node:alpine'
      args '-v /cache/alfred-front/node_modules:/node_modules'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'yarn install'
      }
    }

    stage('Test') {
      steps {
        sh 'yarn test'
      }
    }

  }
}