pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') // Update with your Jenkins credentials ID
    }

    stages {
        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                dir('learnerReportCS_backend') {
                    sh 'docker build -t vignesh342/learnerreport-backend:latest .'
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                echo '📤 Pushing to DockerHub...'
                withDockerRegistry([credentialsId: 'dockerhub-credentials', url: 'https://index.docker.io/v1/']) {
                    sh 'docker push vignesh342/learnerreport-backend:latest'
                }
            }
        }

        stage('Deploy with Helm') {
            steps {
                echo '🚀 Skipping Helm deployment – local Kubernetes not accessible from Jenkins EC2.'
            }
        }
    }

    post {
        success {
            echo '✅ Build and push successful!'
        }
        failure {
            echo '❌ Build or deployment failed. Please check logs.'
        }
    }
}
