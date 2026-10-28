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
          sh 'ssh -i "$KEY" -o IdentitiesOnly=yes tonkla@host.docker.internal'
        }
      }
    }
  }

  post {
    always { deleteDir() }
  }
}
