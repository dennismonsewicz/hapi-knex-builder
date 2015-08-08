'use strict';

function Builder (knex) {
    this.knex = knex;
}

Builder.prototype.buildCountQuery = function (count) {
    if (!count) {
        return this;
    }

    this.knex = this.knex.count('* as count');

    return this;
};

Builder.prototype.buildPaginationQuery = function (limit, offset) {
    if (!limit && !offset) {
        return this;
    }

    this.knex = this.knex.limit(limit);

    if (offset !== undefined) {
        this.knex = this.knex.offset(offset);
    }

    return this;
};

Builder.prototype.buildSortQuery = function (sortBy, sortDir) {
    if (!sortBy) {
        return this;
    }

    this.knex = this.knex.orderBy(sortBy, sortDir);

    return this;
};

exports.builder = Builder;
