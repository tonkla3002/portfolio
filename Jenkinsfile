pipeline {
  agent any

  tools { nodejs 'node20' }

  options {
    disableConcurrentBuilds()
    timeout(time: 20, unit: 'MINUTES')
    buildDiscarder(logRotator(numToKeepStr: '20'))
    timestamps()
  }

  triggers { pollSCM('H/5 * * * *') }

  environment {
    NEXT_TELEMETRY_DISABLED = '1'
    npm_config_cache = "${WORKSPACE}/.npm"
  }

  stages {
    stage('Install') {
      steps { sh 'npm ci --no-audit --no-fund' }
    }
    stage('Lint') {
      steps { sh 'npm run lint' }
    }
    stage('Build') {
      steps { sh 'npm run build' }
    }
    stage('Deploy') {
      when { expression { env.GIT_BRANCH in ['main', 'origin/main'] } }
      steps {
        withCredentials([sshUserPrivateKey(credentialsId: 'portfolio-deploy', keyFileVariable: 'KEY')]) {
          sh 'ssh -i "$KEY" -o IdentitiesOnly=yes tonkla@host.docker.internal deploy'
        }
      }
    }
    stage('Health check') {
      when { expression { env.GIT_BRANCH in ['main', 'origin/main'] } }
      steps {
        sh '''
          for i in $(seq 1 12); do
            code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 5 https://portfolio.thana-wan.duckdns.org/does-not-exist || true)
            echo "attempt $i: HTTP $code"
            [ "$code" = "200" ] && exit 0
            sleep 5
          done
          echo "health check failed"
          exit 1
        '''
      }
      post {
        failure {
          withCredentials([sshUserPrivateKey(credentialsId: 'portfolio-deploy', keyFileVariable: 'KEY')]) {
            sh 'ssh -i "$KEY" -o IdentitiesOnly=yes tonkla@host.docker.internal rollback'
          }
        }
      }
    }
  }

  post {
    always { deleteDir() }
  }
}
