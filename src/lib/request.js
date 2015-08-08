'use strict';

var Builder = require('./builder').builder;

exports.mixin = function(knex, request) {
    var b = new Builder(knex);
    var count = request.query.count;
    var limit = parseInt(request.query.limit);
    var offset = parseInt(request.query.offset);
    var sortBy = request.query.sort_by;
    var sortDir = request.query.sort_dir || 'ASC';

    request.app.knex = b.buildCountQuery(count)
        .buildPaginationQuery(limit, offset)
        .buildSortQuery(sortBy, sortDir)
        .knex;
};
