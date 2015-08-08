# Hapi-Knex-Builder

# What Am I?
Hapi-Knex-Builder is a simple Hapi.js plugin that helps with pagination/sorting/counting
by add a knex object onto the `request.app` object before a request is processed.

# Usage
See https://github.com/dennismonsewicz/hapi-knex-middleware-example

Take note to the way the local JSON file is setup. Once the plugin is installed, inside each of your routes, all you have to do to access the knex library is call `request.app.knex`

# Run tests
`npm run test`
