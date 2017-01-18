# DevOps Workshop test app

This app is for testing continuous deployments on [cloud.gov](https://cloud.gov).

## Overview

This is a basic [Node.js](https://nodejs.org) app that outputs a simple message.

The app has development, test, and production environments in cloud.gov Each of these environments is contained in its own [cloud.gov space](https://cloud.gov/docs/getting-started/concepts/#spaces).

[Travis CI](https://travis-ci.org/) is configured to run the app's unit tests and, if tests are successful, [deploy the code to cloud.gov](https://cloud.gov/docs/apps/continuous-deployment/). Travis CI is configured with environment variables containing a [deployer account's](https://cloud.gov/docs/apps/continuous-deployment/#provisioning-deployment-credentials) credentials. This allows Travis CI to connect to the cloud.gov API and push the app.

### The general process

Development:

1. Developer pushes a change to the `dev` branch on GitHub
2. Travis CI detects the push, and runs tests
3. If tests pass, Travis CI deploys to the cloud.gov dev environment

Testing:

1. Developer merges the `dev` branch into the `test` branch
2. Developer pushes the updated `test` branch to GitHub
3. Travis CI detects the push to `test`, and runs tests
4. If tests pass, Travis CI deploys to the cloud.gov test environment
5. Users can test the app in the test environment

Production:

1. Developer merges the `test` branch into the `master` branch
2. Developer or ops engineer does a `cf push` to manually deploy to production

## Setup

Here is how to reproduce this environment.

### 1. cloud.gov

#### 1.1 Create spaces

Create a new [space](https://cloud.gov/docs/getting-started/concepts/#spaces) for each environment (dev, test, prod, etc) in which the app will run (or just use the org's `sandbox` space). This example uses a development environment, a test environment, and a production environment.

Example:

```
cf create-space workshop-dev
cf create-space workshop-test
cf create-space workshop-prod
```

#### 1.2 Provision deployer accounts

[Provision a deployer account](https://cloud.gov/docs/apps/continuous-deployment/#provisioning-deployment-credentials) for each space you want Travis CI to continuously deploy to. Make a note of the new usernames and passwords that cloud.gov creates for you; you will input this into Travis CI later.

This example will continuously deploy to the development and test environments, while requiring a manual deployment to production. Because we are manually deploying to production, we do not create a deployer account for the `workshop-prod` space in this example.

Example:
```
cf target -o gsa-cto -s workshop-dev
cf create-service cloud-gov-service-account space-deployer workshop-dev-deployer

cf target -o gsa-cto -s workshop-test
cf create-service cloud-gov-service-account space-deployer workshop-test-deployer
```

### 2. GitHub

#### 2.1 Set up a repository

Either [create a new repository](https://help.github.com/articles/create-a-repo/) and commit a simple app, or [fork this repository](https://help.github.com/articles/fork-a-repo/).

#### 2.2 Add or edit configuration files

Ensure you have the following files in your repository, and configure them as appropriate.

##### manifest.yml

We actually have three manifest files. Make sure you set an unique name in each file:

* [`manifest.dev.yml`](manifest.dev.yml) - configures the development environment
* [`manifest.test.yml`](manifest.test.yml) - configures the test environment
* [`manifest.yml`](manifest.yml) - configures the production environment

##### .travis.yml

The [`.travis.yml`](.travis.yml) file tells Travis CI how to deploy the app. There are two sections under `deploy`. One is for dev and one is for test. Make sure the `space` fields match whatever spaces you created in cloud.gov (or use `sandbox`).

### 3. Travis CI

#### 3.1 Connect GitHub

[Connect your GitHub account to Travis CI](https://docs.travis-ci.com/user/for-beginners).

#### 3.2 Enable builds

On your [Travis CI profile page](https://travis-ci.org/profile), enable builds for your GitHub repo.

#### 3.3 Configure deployment variables

Add [environment variables](https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings) to Travis CI settings. These should match the deployer account credentials you created in step [1.2](1.2 Provision deployer accounts):
  1. `DEV_DEPLOYER_USERNAME`
  2. `DEV_DEPLOYER_PASSWORD`
  3. `TEST_DEPLOYER_USERNAME`
  4. `TEST_DEPLOYER_PASSWORD`

Note that `.travis.yml` makes references to these environment variables. This is how Travis CI authenticates to cloud.gov when deploying to the dev and test environments.
