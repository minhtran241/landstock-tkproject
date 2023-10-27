'use strict';

const { getAllEntriesWithFunc } = require('../../../controllers/bds');

module.exports = async function (fastify, opts) {
    fastify.get('/', opts, getAllEntriesWithFunc);
};
