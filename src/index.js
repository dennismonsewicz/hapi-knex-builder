'use strict';

var _ = require('lodash');
var mixin = require('./lib/request').mixin;

exports.register = function (server, options, next) {
    var opts = _.extend(server.settings.app, options, {});
    var knex = require('knex')(opts.sql);

    server.ext('onPreHandler', function (request, reply) {
        mixin(knex, request);

        return reply.continue();
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
