pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'swkariyawasam' 
        
        BACKEND_IMAGE = "${DOCKER_HUB_USER}/greencart-backend"
        DASHBOARD_IMAGE = "${DOCKER_HUB_USER}/greencart-dashboard"
        
        DOCKER_CREDS = 'docker-hub-credentials'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build & Push Backend') {
            steps {
                script {
                    dir('Greencart-Backend') {
                        echo 'Building Backend...'
                        def backendApp = docker.build("${BACKEND_IMAGE}:latest")
                        
                        docker.withRegistry('', DOCKER_CREDS) {
                            backendApp.push()
                        }
                    }
                }
            }
        }

        stage('Build & Push Dashboard') {
            steps {
                script {
                    dir('Greencart-Dashboard') {
                        echo 'Building Dashboard...'
                        def dashboardApp = docker.build("${DASHBOARD_IMAGE}:latest")
                        
                        docker.withRegistry('', DOCKER_CREDS) {
                            dashboardApp.push()
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            sh "docker rmi ${BACKEND_IMAGE}:latest || true"
            sh "docker rmi ${DASHBOARD_IMAGE}:latest || true"
        }
    }
}