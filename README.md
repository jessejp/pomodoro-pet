# Pomodoro Pet 🐵
Pomodoro with fun!

# Tasks

- setup backend
  - [x] setup postgres db with docker compose
  - [x] init node project into /api/
  - [x] setup prisma and migrate initial user tables
  - [x] setup OAuth
  ~~- [ ] setup docker container for server~~
  - [ ] db schema update
    - fix forced pomodoro task timer?
    - fix auth session pointless
  - [ ] setup test environment for api
    - https://www.prisma.io/blog/testing-series-1-8eRB5p0Y8o
    - https://github.com/ivandotv/vitest-database-containers
- frontend to backend e2e typesafe
  - [ ] Zod -> Orval?
  - [ ] tanstack/react-query
- frontend rewrite
  - [ ] plan & design pages
  - [ ] rewrite react router routes
- testing and ci/cd pipeline
  - [ ] backend API tests
  - [ ] run tests on pull request
- backlog
  - [ ] static frontpage (SEO)