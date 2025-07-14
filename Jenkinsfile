pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'vignesh342'
        IMAGE_NAME = "${DOCKERHUB_USERNAME}/learnerreport-backend"
        HELM_RELEASE_NAME = "learnerreport"
        HELM_CHART_DIR = "./helm-chart"
    }

    stages {
        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                dir('learnerReportCS_backend') {
                    sh 'docker build -t $IMAGE_NAME:latest .'
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                echo '📤 Pushing to DockerHub...'
                withDockerRegistry([url: '', credentialsId: 'dockerhub-vignesh']) {
                    sh 'docker push $IMAGE_NAME:latest'
                }
            }
        }

        stage('Deploy with Helm') {
            steps {
                echo '🚀 Deploying to Kubernetes via Helm...'
                sh 'helm upgrade --install $HELM_RELEASE_NAME $HELM_CHART_DIR'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Build or deployment failed. Please check logs.'
        }
    }
}
