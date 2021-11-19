<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Project Status
This project is currently under development.

## Description

Checklist with Auth [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository is a project demonstrates Google, Apple and Facebook Sign-up and Login complete with tests.

## Requirements
The following should be installed in order for this project to run locally:
- Docker
- NodeJS version 14
- [direnv](https://direnv.net/)

## Setup
Google, Facebook and Apple client keys and secrets should be entered in `.envrc` file. Please refer to `.envrc.sample` for more information.

## Installation

```bash
$ yarn install
```

## Running the local development database and cache (if any)
```bash
$ docker-compose up -d
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Migrations

### Generate a migration
```bash
$ yarn typeorm migration:generate -n "My Migration"
```

### Run the migrations
```bash
$ yarn typeorm migration:run
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Support
For more information specific to this project, contact me directly here in Github.
For more information about NestJS, please visit the NestJS web site.

## License

Checklist with Auth is [MIT licensed](LICENSE).
