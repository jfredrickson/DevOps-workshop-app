# Node.js Test App for DevOps Workshop

This app is for testing continuous deployments on [cloud.gov](https://cloud.gov).

## Overview

This is a basic [Node.js](https://nodejs.org) app that outputs a simple message.

The app is running as a single instance in a single [cloud.gov space](https://cloud.gov/docs/getting-started/concepts/#spaces). *(TODO: create separate spaces for dev and prod, and have Travis CI deploy into these separate environments.)*

Travis CI is configured to run the app's unit tests and, if tests are successful, deploy the code to cloud.gov. Travis CI is configured with environment variables containing a [deployer account's](https://cloud.gov/docs/apps/continuous-deployment/#provisioning-deployment-credentials) credentials. This allows Travis CI to connect to the cloud.gov API and push the app.

The general process:

1. Developer pushes a change to GitHub
2. Travis CI detects the push, and runs tests
3. If tests pass, Travis CI [deploys to cloud.gov](https://cloud.gov/docs/apps/continuous-deployment/)

## Setup

Here is how to reproduce this DevOps environment.

### cloud.gov

1. Create a new [space](https://cloud.gov/docs/getting-started/concepts/#spaces) in which the app will run (or use the org's `sandbox` space)
2. [Provision a deployer account](https://cloud.gov/docs/apps/continuous-deployment/#provisioning-deployment-credentials)

### GitHub

1. Either [create a new repository](https://help.github.com/articles/create-a-repo/) and commit a simple app, or [fork this repository](https://help.github.com/articles/fork-a-repo/)
2. Ensure you have the following files in your repository, and configure them as appropriate:
  1. [`manifest.yml`](https://github.com/jfredrickson5/DevOps-test-node/blob/master/manifest.yml) for cloud.gov
    1. `name` - Give your app an unique name
  2. [`.travis.yml`](https://github.com/jfredrickson5/DevOps-test-node/blob/master/.travis.yml) for Travis CI
    1. The `space` field should match whatever space you created in cloud.gov (or use `sandbox`)
    2. The `repo` field should be your GitHub repo

### Travis CI

1. [Connect your GitHub account to Travis CI](https://docs.travis-ci.com/user/for-beginners)
2. On your [Travis CI profile page](https://travis-ci.org/profile), enable builds for your GitHub repo
3. Add [environment variables](https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings) to Travis CI settings for your repo so that it can authenticate to the cloud.gov API when deploying
  1. `DEPLOYER_USERNAME` is the username of the deployer account you created when provisioning a deployer account in cloud.gov
  2. `DEPLOYER_PASSWORD` is the password of the deployer account you created when provisioning a deployer account in cloud.gov
