## Objective

This project is being created to learn more about NestJS and to complete the Tech Challenge for the college.

## Project setup

```bash
$ npm install

# Up the database
$ docker-compose up -d

# Create a .env file and copy the content of .env.example
# Run the migrations
$ npx prisma migrate dev

# Run the project
$ npm run start
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Documentation

```bash
# Check swagger documentation
$ http://localhost:3000/api
```