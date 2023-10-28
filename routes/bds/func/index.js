'use strict';

const { getFuncValue } = require('../../../controllers/bds');
const {
    getFuncSchemaGenerator,
} = require('../../../utilities/schemaGenerators');

const getFuncOpts = getFuncSchemaGenerator(getFuncValue);

module.exports = async function (fastify, opts) {
    fastify.get('/', getFuncOpts);
};
