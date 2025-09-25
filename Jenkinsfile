pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // stage('Checkout') {
        //     steps {
        //         checkout([
        //           $class: 'GitSCM',
        //           branches: [[name: '*/main']],
        //           userRemoteConfigs: [[
        //               url: 'https://github.com/ivanruiz113/prueba_jenkins_admin.git',
        //               credentialsId: '7dfda764-c3a3-4384-9c71-6a98bb249e53'
        //           ]]
        //       ])
        //     }
        // }

        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Detect Affected') {
            steps {
                script {
                    def affected = sh(
                        script: "npx nx show projects --affected --target=build --select=projects --base=HEAD~1 --head=HEAD",
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
