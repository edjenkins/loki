# Loki

> Loki is a tool for distributing SMS and Email messages to groups of subscribers by geographical subscription areas.

> Developed at Open Lab, Newcastle University as an open-source project to support new and upcoming research projects.

## Contributors
| Name | Contribution | Contact |
| --- | --- | --- |
| `Edward Jenkins` | `Lead developer` | [edjenkins.co.uk](https://edjenkins.co.uk), [@edjenkins91](https://twitter.com/edjenkins91)|

## Features

### Messages
Draft messages and allocate them to one or more subscription groups before dispatch at a later date.

### Groups
Create subscription groups to manage delivery of messages tailored by location, time and state.


## Details
- Vue.js frontend which communicates with a vanilla Express node.js server.
  - node.js - [nodejs.org](https://nodejs.org)
  - Vue.js - [vuejs.org](https://vuejs.org)
  - Express - [expressjs.com](https://expressjs.com)
- Webpack is used to build front-end
  - Webpack - [webpack.js.org](https://webpack.js.org/)
- Caddy server for automatic SSL and domain configuration.
  - Caddy - [caddyserver.com](https://caddyserver.com/)


## Getting started

### Start by pulling this repository and creating the required .env to store private keys/passwords/secrets (use the examples provided).
```
cp ./example.env ./.env
cp ./api/example.env ./api/.env
```

### Install node dependencies from [npmjs.com](https://www.npmjs.com/) for client and server.
```
cd app && npm install
cd ..
cd api && npm install
```

### Spin up the docker stack. This will fire up the API, redis, mongo and some helper containers.
```
docker-compose up -d
```

## Monitor the containers
```
docker-compose logs -f [CONTAINER_NAME]
```

## Start webpack to serve development files
``` bash
# Move into app directory
cd app

# Serve app with hot reload enabled (localhost:8080)
npm run dev
```

## Contributing
Please feel free to pull the code and add to it where you see fit. If you do anything interesting tweet me [@edjenkins91](https://twitter.com/edjenkins91)