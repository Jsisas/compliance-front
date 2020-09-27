pipeline {
    agent {
        docker {
            image 'node:alpine'
        }
    }
    environment {
        CI = 'true'
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