'use strict';

const { po_HuongNha } = require('../../utilities/paramsOperations');
const {
    getAllEntriesStd,
    getEntryByIdStd,
    postEntryStd,
    deleteEntryStd,
} = require('../standard');
const { table } = require('./constants');

/**
 * Function to get all entries for real estate based on the direction of the house.
 * @param {object} request - The Fastify request object.
 * @param {object} reply - The Fastify reply object.
 * @returns {Promise} - A promise resolving to the result of the standard function for getting all entries.
 */
const getAllEntries = async (request, reply) => {
    return getAllEntriesStd(request, reply, po_HuongNha, table);
};

/**
 * Function to get a real estate entry by its ID based on the direction of the house.
 * @param {object} request - The Fastify request object.
 * @param {object} reply - The Fastify reply object.
 * @returns {Promise} - A promise resolving to the result of the standard function for getting an entry by ID.
 */
const getEntryById = async (request, reply) => {
    return getEntryByIdStd(request, reply, po_HuongNha, table);
};

/**
 * Function to insert a new real estate entry based on the direction of the house.
 * @param {object} request - The Fastify request object.
 * @param {object} reply - The Fastify reply object.
 * @returns {Promise} - A promise resolving to the result of the standard function for inserting a new entry.
 */
const postEntry = async (request, reply) => {
    return postEntryStd(request, reply, po_HuongNha, table);
};

/**
 * Function to delete a real estate entry by its ID based on the direction of the house.
 * @param {object} request - The Fastify request object.
 * @param {object} reply - The Fastify reply object.
 * @returns {Promise} - A promise resolving to the result of the standard function for deleting an entry.
 */
const deleteEntry = async (request, reply) => {
    return deleteEntryStd(request, reply, po_HuongNha, table);
};

// Export functions for use in other modules
module.exports = {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
};
