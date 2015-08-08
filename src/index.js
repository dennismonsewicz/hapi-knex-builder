'use strict';

'use strict';

var mixin = require('./lib/request').mixin;

exports.register = function (server, options, next) {

    var knex = server.plugins.db.knex;

    server.ext('onPreHandler', function (request, reply) {
        mixin(knex, request);

        return reply.continue();
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
