pipeline {
    agent any

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
                    // Detect apps afectadas en el PR / commit
                    def affected = sh(
                        script: "npx nx print-affected --target=build --select=projects --base=origin/main --head=HEAD",
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
                    def projects = env.AFFECTED_PROJECTS.split(',')
                    for (p in projects) {
                        echo "Ejecutando build para ${p}"
                        sh "npx nx build ${p}"
                        sh "cp -r dist/apps/${p}/* /var/jenkins_builds/${p}/"
                    }
                }
            }
        }
    }
}
