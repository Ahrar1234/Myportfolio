pipeline {
    agent any
    
    environment {
        IMAGE_NAME = "portfolio-website"
        IMAGE_TAG = "${BUILD_NUMBER}"
        CONTAINER_NAME = "portfolio-container"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    // Build the Docker image
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                    sh "docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest"
                }
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                script {
                    // Test if the image can run successfully
                    sh "docker run --rm ${IMAGE_NAME}:${IMAGE_TAG} nginx -t"
                }
            }
        }
        
        stage('Stop Previous Container') {
            steps {
                echo 'Stopping and removing previous container...'
                script {
                    // Stop and remove existing container if running
                    sh "docker stop ${CONTAINER_NAME} || true"
                    sh "docker rm ${CONTAINER_NAME} || true"
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying new container...'
                script {
                    // Run the new container
                    sh "docker run -d --name ${CONTAINER_NAME} -p 3000:80 ${IMAGE_NAME}:latest"
                }
            }
        }
        
        stage('Verify Deployment') {
            steps {
                echo 'Verifying deployment...'
                script {
                    // Check if container is running
                    sh "docker ps | grep ${CONTAINER_NAME}"
                    
                    // Wait a bit for container to start
                    sh "sleep 10"
                    
                    // Test if website is accessible
                    sh "curl -f http://localhost:3000 || exit 1"
                }
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning up old images...'
            script {
                // Clean up old images (keep last 3 builds)
                sh """
                    docker images ${IMAGE_NAME} --format 'table {{.Tag}}' | \
                    grep -E '^[0-9]+\$' | \
                    sort -rn | \
                    tail -n +4 | \
                    xargs -I {} docker rmi ${IMAGE_NAME}:{} || true
                """
            }
        }
        success {
            echo '✅ Pipeline succeeded! Website deployed at http://localhost:3000'
        }
        failure {
            echo '❌ Pipeline failed! Check logs for details.'
        }
    }
}
