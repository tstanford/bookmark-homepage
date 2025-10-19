pipeline {
    agent {
        docker {
                image 'node:18-alpine'
        }
    }

    environment {
        DOCKERHUB_CREDENTIALS = "dockerHubCredentials"
        KUBECONFIG = "/var/jenkins_home/.kube/config"
        IMAGE_NAME = "bookmark-homepage"
        IMAGE_TAG = "1.0.${BUILD_NUMBER}"
    }

    options {
        buildDiscarder(logRotator(
          daysToKeepStr: '30',
          numToKeepStr: '10'
        ))
    }

    stages {
        stage('Build') {
            steps {
                sh "npm install yarn -g"
            }
        }
        stage('Test') {
            steps {
                    sh 'CI=true npm test'
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS, usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        docker.withRegistry('https://hub.docker.com/') {
                            sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}"
                            sh "docker build -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG} ."
                            sh "docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG}"
                        }
                    }
                }
            }
        }

    // stage('Deploy to Kubernetes') {
    //     steps {
    //         script {
    //             withEnv(["KUBECONFIG=${KUBECONFIG}"]) {
    //                 sh "curl https://get.helm.sh/helm-v3.19.0-linux-amd64.tar.gz | tar zxf - "
    //                 sh "linux-amd64/helm upgrade --install bookmark-service ./chart --set bookmarkService.tag=${IMAGE_TAG}"
    //             }
    //         }
    //     }
    // }
    }
}
