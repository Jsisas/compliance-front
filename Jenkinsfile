pipeline {
  agent {
    docker {
      image 'node:alpine'
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