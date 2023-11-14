'use strict';

const { po_Tinh } = require('../../utilities/paramsOperations');
const {
    getAllEntriesStd,
    getEntryByIdStd,
    postEntryStd,
    deleteEntryStd,
} = require('../standard');
const { table } = require('./constants');

/**
 * Function to get all cities.
 * @param {object} request - The Fastify request object.
 * @param {object} reply - The Fastify reply object.
 * @returns {Promise} - A promise resolving to the result of the standard function for getting all entries.
 */
const getAllEntries = async (request, reply) => {
    return getAllEntriesStd(request, reply, po_Tinh, table);
};

/**
 * Function to get a city entry by its ID.
 * @param {object} request - The Fastify request object.
 * @param {object} reply - The Fastify reply object.
 * @returns {Promise} - A promise resolving to the result of the standard function for getting an entry by ID.
 */
const getEntryById = async (request, reply) => {
    return getEntryByIdStd(request, reply, po_Tinh, table, 'iID_MaTinh');
};

/**
 * Function to insert a new city entry.
 * @param {object} request - The Fastify request object.
 * @param {object} reply - The Fastify reply object.
 * @returns {Promise} - A promise resolving to the result of the standard function for inserting a new entry.
 */
const postEntry = async (request, reply) => {
    return postEntryStd(request, reply, po_Tinh, table);
};

/**
 * Function to delete a city entry by its ID.
 * @param {object} request - The Fastify request object.
 * @param {object} reply - The Fastify reply object.
 * @returns {Promise} - A promise resolving to the result of the standard function for deleting an entry.
 */
const deleteEntry = async (request, reply) => {
    return deleteEntryStd(request, reply, po_Tinh, table, 'iID_MaTinh');
};

// Export functions for use in other modules
module.exports = {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
};
