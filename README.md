## Description

## Main features

- In this PR, I used `@nestjs/swagger` module to test API endpoints directly in the browser.
  - Swagger greatly enhances the developer experience. It can improve collaboration within teams and between frontend and backend developers.
- I have established data persistence using TypeORM with a PostgreSQL database.
- I implemented user authentication with JWT tokens by using Passport.js.
- I assigned CRUD(Create, Read, Update, Delete) functionalities to only authenticated users.
- I used pivot table to engineer `Favorites` functionality.
- I wrote the jest unit test code for AuthModule to showcase.
- I've implemented role-based access control (RBAC) within my application by using RolesDecorator.
  - This decorator is used to differentiate between admin users and general users, ensuring that authorizations are correctly enforced according to the assigned roles.
- I tried to establish the main skeleton that makes it easy to extend and add new features in future development.

## URLs

- GET `/` (For Swagger)
- POST `/auth/register`
- POST `/auth/login`
- POST `/cats`
- GET `/cats`
- GET `/cats/{id}`
- PUT `/cats/{id}`
- DELETE `/cats/{id}`
- PUT `/user/favorites`
- DELETE `/user/favorites`

## External libraries

dependencies:

- `@nestjs/swagger`
- `@nestjs/jwt`
- `@nestjs/passport`
- `passport-jwt`
- `passport-local`
- `bcrypt`
- `pg`

devDependencies:

- `@faker-js/faker`
- `fishery`

## Folders and files

- jest.json
- ormconfig.json
- package.json
- package-lock.json
- README.md
- src
  - app.module.ts
  - auth
    - auth.controller.spec.ts
    - auth.controller.ts
    - auth.module.ts
    - auth.service.ts
    - dto
      - auth.login.dto.ts
      - auth.register.dto.ts
      - auth.token.dto.ts
    - jwt-auth.guard.ts
    - jwt.strategy.ts
    - local-auth.guard.ts
    - local.strategy.ts
    - secret.key.ts
    - service
      - auth.login.service.spec.ts
      - auth.login.service.ts
      - auth.register.service.spec.ts
      - auth.register.service.ts
      - auth.validate-user.service.spec.ts
      - auth.validate-user.service.ts
  - cats
    - cat.entity.ts
    - cats.controller.ts
    - cats.module.ts
    - cats.service.ts
    - dto
      - cat.dto.ts
    - interfaces
      - cat.interface.ts
  - common
    - entity
      - base.entity.ts
  - config
    - database.ts
  - main.ts
  - swagger.ts
  - users
    - dto
    - favorite.dto.ts
    - user.controller.ts
    - user.entity.ts
    - user.factory.ts
    - user.module.ts
    - user.service.ts
- tsconfig.build.json
- tsconfig.json

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# productiona mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

# tundrax-xyz

Thank you!!!
