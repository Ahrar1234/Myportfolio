
pipeline {
    agent any

    environment {
        VERCEL_TOKEN = credentials('VERCEL_TOKEN')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main', url: 'https://github.com/Ahrar1234/Myportfolio.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t my-static-site .'
            }
        }

        stage('Test Docker Image') {
            steps {
                echo 'Running Docker container for test...'
                sh 'docker run -d -p 8080:8080 --name test-site my-static-site'
                sh 'sleep 5'
                sh 'curl -f http://localhost:8080 || exit 1'
                sh 'docker stop test-site && docker rm test-site'
            }
        }

        stage('Deploy to Vercel') {
            steps {
                echo 'Deploying to Vercel...'
                sh '''
                    npm install -g vercel
                    vercel --token=$VERCEL_TOKEN --prod --confirm
                '''
            }
        }
    }

    post {
        always {
            sh 'docker system prune -f || true'
        }
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed!'
            sh 'docker stop test-site && docker rm test-site || true'
        }
    }
}
