pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = 'azwadhq/isec6000-node-app'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
    }

    stages {
        stage('Checkout Source') {
            steps {
                echo 'Checking out source code from GitHub repository...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing production and development dependencies...'
                sh 'npm install'
            }
        }

        stage('Automated Unit Testing') {
            steps {
                echo 'Executing Jest and Supertest test suites...'
                sh 'npm test'
            }
        }

        stage('Static Vulnerability Scanning') {
            steps {
                echo 'Executing dynamic dependency vulnerability audit...'
                sh 'npm audit --audit-level=high'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Compiling hardened Docker container image: ${DOCKER_HUB_REPO}:${IMAGE_TAG}..."
                script {
                    dockerImage = docker.build("${DOCKER_HUB_REPO}:${IMAGE_TAG}", "-f Dockerfile .")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Publishing verified container image to Docker Hub...'
                script {
                    docker.withRegistry('', DOCKER_CREDENTIALS_ID) {
                        dockerImage.push("${IMAGE_TAG}")
                        dockerImage.push("latest")
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution cycle completed. Cleaning workspace...'
            cleanWs()
        }
        success {
            echo 'Build, verification, containerization, and publishing succeeded.'
        }
        failure {
            echo 'Pipeline halted. Failure detected in build, automated tests, or security scanning.'
        }
    }
}
