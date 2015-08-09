# Hapi-Knex-Builder

# What Am I?
Hapi-Knex-Builder is a simple Hapi.js plugin that helps with pagination/sorting/counting
by adding a Knex.js object onto the `request.app` object before a request is processed.

See http://hapijs.com/api#request-lifecycle to read up on how the Hapijs Server
processes requests

# Usage
For an example, visit https://github.com/dennismonsewicz/hapi-knex-middleware-example

Take note to the way the [local JSON file](https://github.com/dennismonsewicz/hapi-knex-builder-example/blob/master/config/local.json#L2-L10) is setup. Once the plugin is installed, inside each of your routes, all you have to do to access the knex library is call `request.app.knex`

# Route example
```
server.route([
        {
            method: 'GET',
            path: '/example',
            config: {
                handler: function (request, reply) {
                    // We can access the knex library here because the plugin
                    // has already done the lifting for us
                    var select = request.app.knex.select().from('tbl');
                    return reply(select.toQuery());
                }
            }
        }
    ]);
```

# Run tests
`npm run test`
