'use strict';

/**
 * Module for sanitizing and converting data based on predefined types.
 * @module Sanitization
 */

const {
    SMALL_LIMIT_TABLES,
    SMALL_MAX_LIMIT,
    SMALL_MAX_OFFSET,
    BIG_MAX_LIMIT,
    BIG_MAX_OFFSET,
} = require('../constants');

/**
 * Converts data properties to their specified types based on the provided parameter object.
 * @param {Array} po - Parameter object specifying types for data properties.
 * @param {Array} dataToConvert - Array of data objects to be converted.
 */
const convertToType = (po, dataToConvert) => {
    dataToConvert.forEach((data) => {
        Object.entries(data).forEach(([key, value]) => {
            const poItem = po.find((poItem) => poItem.p === key);
            if (poItem) {
                if (poItem.t === 'number') {
                    data[key] = Number(value);
                } else if (poItem.t === 'boolean') {
                    data[key] = Boolean(value);
                }
            }
        });
    });
};

/**
 * Sanitizes and limits the provided limit and offset values based on predefined maximums.
 * @param {Object} requestQuery - Request query object containing limit and offset.
 * @param {string} table - Name of the table associated with the request.
 * @returns {Object} - Sanitized limit and offset values.
 */
const sanitizeLimitAndOffset = (requestQuery, table) => {
    const maxLimit = SMALL_LIMIT_TABLES.includes(table)
        ? SMALL_MAX_LIMIT
        : BIG_MAX_LIMIT;
    const maxOffset = SMALL_LIMIT_TABLES.includes(table)
        ? SMALL_MAX_OFFSET
        : BIG_MAX_OFFSET;

    const limit = Math.min(Number(requestQuery.limit) || maxLimit, maxLimit);
    const skip = Math.min(Number(requestQuery.skip) || 0, maxOffset);

    return { limit, skip };
};

/**
 * Sanitizes and extracts the result of a specific function from the provided data.
 * @param {Array} data - Array of data objects.
 * @param {string} func - Function name for which the result is extracted.
 * @returns {Object} - Sanitized response containing the extracted function value.
 * @throws Will throw an error if data or func is null.
 */
const sanitizeGetFuncResponse = (data, func) => {
    if (data !== null) {
        if (func !== null && func !== 'sort') {
            return {
                value: data[0][`${func}()`],
            };
        } else if (func === 'sort') {
            return data;
        }
    }
    throw new Error('Data not found');
};

module.exports = {
    convertToType,
    sanitizeLimitAndOffset,
    sanitizeGetFuncResponse,
};
