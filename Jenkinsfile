pipeline {
  agent {
    environment {
      CI = 'true'
    }

    docker {
      image 'node:alpine'
    }

    stages {
      stage('Build') {
        steps {
          sh 'npm install'
        }
      }

      stage('Test') {
        steps {
          sh 'npm test'
        }
      }
    }
  }
}