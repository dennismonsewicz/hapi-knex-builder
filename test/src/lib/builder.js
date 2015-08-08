'use strict';

var Builder = require('../../../src/lib/builder').builder;
var assert = require('chai').assert;
var sinon = require('sinon');

describe("Builder", function() {
    var knex;

    beforeEach(function() {
        knex = sinon.stub();
        knex.count = sinon.stub().returns(knex);
        knex.limit = sinon.stub().returns(knex);
        knex.offset = sinon.stub().returns(knex);
        knex.orderBy = sinon.stub().returns(knex);
    });

    describe("constructor", function() {
        var b = new Builder(knex);

        assert.isNotNull(b.knex);
    });

    describe("#buildCountQuery", function() {
        it("should return a count knex object", function() {
            var res = new Builder(knex).buildCountQuery(true).knex;

            assert(res.count.calledOnce);
            assert(res.count.calledWith("* as count"));
        });

        it("should not call knex.count", function() {
            var res = new Builder(knex).buildCountQuery(undefined).knex;

            assert.notOk(res.count.calledOnce);
            assert.notOk(res.count.calledWith("* as count"));
        });
    });

    describe("#buildPaginationQuery", function() {
        it("should return a knex object with limit called", function() {
            var res = new Builder(knex).buildPaginationQuery(1, undefined).knex;

            assert(res.limit.calledOnce);
            assert(res.limit.calledWith(1));
        });

        it("should return a knex object with limit and offset called", function() {
            var res = new Builder(knex).buildPaginationQuery(1, 5).knex;

            assert(res.limit.calledOnce);
            assert(res.limit.calledWith(1));
            assert(res.offset.calledOnce);
            assert(res.offset.calledWith(5));
        });

        it("should not call knex.limit or knex.offset", function() {
            var res = new Builder(knex).buildPaginationQuery(undefined, undefined).knex;

            assert.notOk(res.limit.calledOnce);
            assert.notOk(res.offset.calledOnce);
        });
    });

    describe("#buildSortQuery", function() {
        it("should return a knex object with orderBy called", function() {
            var res = new Builder(knex).buildSortQuery("name", "asc").knex;

            assert(res.orderBy.calledOnce);
            assert(res.orderBy.calledWith("name", "asc"));
        });

        it("should return a knex object with orderBy called", function() {
            var res = new Builder(knex).buildSortQuery("name", undefined).knex;

            assert(res.orderBy.calledOnce);
            assert(res.orderBy.calledWith("name"));
        });

        it("should not call knex.orderBy if no sortBy is available", function() {
            var res = new Builder(knex).buildSortQuery(undefined, "asc").knex;

            assert.notOk(res.orderBy.calledOnce);
        });
    });

    describe("method chaining", function() {
        describe("request with pagination+sorting", function() {
            it("should call knex.limit.offset.sortBy", function() {
                var res = new Builder(knex)
                    .buildPaginationQuery(1, 5)
                    .buildSortQuery("name", "asc")
                    .knex;

                assert(res.limit.calledOnce);
                assert(res.limit.calledWith(1));
                assert(res.offset.calledOnce);
                assert(res.offset.calledWith(5));
                assert(res.orderBy.calledOnce);
                assert(res.orderBy.calledWith("name", "asc"));
            });
        });
    });
});
