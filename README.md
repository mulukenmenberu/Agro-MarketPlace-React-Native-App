# Skill-Lift-Mobile-App

## Steps to run this project locally 

- clone the repo 
- goto the root project directory 
## Android Dev environment setup
--------------------
## IOS Dev environment setup 
--------------------


- run npm install (if any error happens during this step, try the following solutions)
    1. delete package-lock.json file and try npm install again 
    2. use the --force flag. i.e npm install --force 

- run react-native run-ios command to run on ios simulator
- run react-native run-android command to run on android simulator

## Most Common Errors White Setting-up Dev Env
--------------------

BUild 
 ./gradlew assembleRelease
  keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000