pipeline {
    agent {
        docker {
            image 'node:22-alpine'
            args '-v /var/jenkins_home/.npm:/root/.npm -v /var/run/docker.sock:/var/run/docker.sock'
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
                sh 'npm ci'
            }
        }

        stage('Detect Affected') {
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

        stage('Build') {
            steps {
                script {
                    if (env.AFFECTED_PROJECTS?.trim()) {
                        def projects = env.AFFECTED_PROJECTS.split(',')
                        for (p in projects) {
                            echo "Ejecutando build para ${p}"
                            sh "npx nx build ${p}"
                            sh "mkdir -p /var/jenkins_builds/${p}"
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
