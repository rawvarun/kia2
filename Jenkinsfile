#!groovy

@Library('Roche_pipeline_library@pharma_customer_portal') _

node {

  stage('PreBuild') {
    pre_Build{}
  }
  stage('Build') {
    code_Build{}
  } 
  stage('Sonar') {
    sonar_Test{}
  } 
  stage('AEM DEploy') {
   aemNexus_Deploy{
      AUTHOR_IP =  "192.168.99.1"
      PUBLISH_IP = "192.168.99.1"  
      ARTIFACT_ID = "roche-pharma-customerportal-complete-package "
      ARTIFACT_VERSION = "1.5.1"
      GROUP_ID = "roche"
      USERNAME = "admin"
      PASSWORD = "{AQAAABAAAAAQ4G7AVHVaqSQKMX74h+DVzI5cqOi63osWAdFxO8o2YSE=}"
    }
  } 
  stage('Post Tests') {
    post_Tests{ SITE = "http://192.168.99.100" }
  }
  stage('Speed Tests') {
    speed_Tests{ SITE = "http://192.168.99.100" }
  }
}