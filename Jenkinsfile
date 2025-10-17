pipeline {
  agent any

  tools {
    nodejs 'NodeJS_20'
  }

  environment {
    VERCEL_TOKEN = credentials('VERCEL_TOKEN')
  }

  stages {
    stage('Checkout') {
      steps {
        echo 'Cloning repository...'
        checkout scm
      }
    }

    stage('Install Vercel CLI') {
      steps {
        echo 'Installing Vercel CLI...'
        sh 'npm ci || true'        // no-op if package.json not present
        sh 'npm install -g vercel'
      }
    }

    stage('Deploy to Vercel') {
      steps {
        echo 'Deploying to Vercel (production)...'
        sh '''
          vercel --token=$VERCEL_TOKEN --prod --confirm
        '''
      }
    }
  }

  post {
    success {
      echo '✅ Deployment successful'
    }
    failure {
      echo '❌ Deployment failed'
    }
  }
}
