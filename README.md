# Smunch Technical Assignment
## Installation
### Prerequisites: 
1. Insure yarn and docker are installed on your machine.
2. This application itself was designed to mainly be run on a Linux, WSL or equivalent OS/System but can be run in docker.

### Run outside of Docker
- Clone repo
- Have an instance of Mongo running. Set the MONGO_URI in the `.env` file
- Install dependencies: `yarn install`
- Build app:
  - Development version (quicker build) run `yarn dev_build`
  - Production version run (app loads quicker after build) `yarn prod_build`
- Run `MONGO_URI=<mongo_uri> PORT=8080 yarn start`
- Open browser [here](http://localhost:8080/)

### Run Docker stack
- Clone repo
- Run either (both will setup MongoDB and run the app):
  - The development build version: `yarn docker_dev`
  - The production build version: `yarn docker_prod` 
- Open browser [here](http://localhost:8080/)

## Usage