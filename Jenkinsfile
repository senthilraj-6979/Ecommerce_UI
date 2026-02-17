pipeline {
    agent any
    
    options {
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    
    environment {
        NODE_ENV = 'test'
        CI = 'true'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'git log --oneline -1'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }
        
        stage('Lint') {
            steps {
                sh 'npm run lint || true'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm run test:bdd'
            }
        }
        
        stage('Generate Report') {
            steps {
                sh 'npm run report:cucumber'
            }
        }
    }
    
    post {
        always {
            // Publish test results
            junit testResults: 'reports/cucumber-report.json', allowEmptyResults: true
            
            // Publish HTML report
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'reports/cucumber',
                reportFiles: 'cucumber-report.html',
                reportName: 'Cucumber Test Report'
            ])
            
            // Archive reports
            archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true
        }
        
        success {
            echo '✓ Tests passed successfully!'
        }
        
        failure {
            echo '✗ Tests failed. Check the report above.'
        }
        
        cleanup {
            cleanWs()
        }
    }
}
