pipeline {
    agent any
     parameters {
        string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')
    }
    stages {
        stage ("First stage") {
            steps {
                echo("Hello world ${params.PERSON}")
            }
        }
        stage ("Second stage") {
            steps {
                echo("By bye world")
            }
        }
        stage ("Third stage") {
            steps {
                input message: 'Your permission, please', ok: 'Hecha p\'alante'
                withEnv(['REPE=1234']) {
                    echo("Variable definida: ${env.REPE}")
                }
            }
        }
    }    
}
