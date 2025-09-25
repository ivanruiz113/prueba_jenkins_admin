pipeline {
    agent {
        docker {
            image 'node:22-bullseye'
            args '-u root:root'  // evita problemas de permisos
        }
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'rm -rf node_modules dist'
                sh 'npm ci'
            }
        }

        stage('Detect Affected Apps and Libs') {
            steps {
                script {
                    def baseCommit = env.GIT_PREVIOUS_SUCCESSFUL_COMMIT ?: "HEAD~1"
                    def affected = sh(
                        script: "npx nx show projects --affected --target=build --select=projects --base=${baseCommit} --head=HEAD",
                        returnStdout: true
                    ).trim()
                    echo "Proyectos afectados: ${affected}"
                    env.AFFECTED_PROJECTS = affected
                }
            }
        }

        stage('Build affected Apps or Libs') {
            steps {
                script {
                    if (env.AFFECTED_PROJECTS?.trim()) {
                        def projects = env.AFFECTED_PROJECTS.split(',')
                        for (p in projects) {
                            echo "Ejecutando build para ${p}"
                            sh "npx nx build ${p}"
                            sh "cp -r dist/apps/${p}/* /var/jenkins_builds/${p}/"
                        }
                    } else {
                        echo "No hay proyectos afectados, saltando build."
                    }
                }
            }
        }
    }
}
