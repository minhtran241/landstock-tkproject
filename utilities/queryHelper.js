'use strict';

const moment = require('moment');

/**
 * Cleans and converts values in an object based on their types.
 * @param {Object} values - The object containing values to be cleaned and converted.
 * @returns {Object} - The cleaned and converted object.
 */
function cleanAndConvert(values) {
    const cleanedValues = {};

    for (const key in values) {
        const value = values[key];

        if (
            value !== null &&
            value !== undefined &&
            value !== '' &&
            value !== 'null'
        ) {
            if (key.startsWith('i') || key.startsWith('f')) {
                // Convert numeric attributes to numbers
                cleanedValues[key] = Number(value);
            } else if (key.startsWith('s')) {
                // Convert string attributes to strings
                cleanedValues[key] = String(value);
            } else if (key.startsWith('b')) {
                // Convert boolean attributes to boolean
                cleanedValues[key] = Boolean(value);
            } else if (key.startsWith('d')) {
                // Convert date attributes to formatted date strings
                cleanedValues[key] = moment(value).format(
                    'YYYY-MM-DD HH:mm:ss'
                );
            } else {
                // Keep other attributes as-is
                cleanedValues[key] = value;
            }
        }
    }

    return cleanedValues;
}

/**
 * Removes null, undefined, empty string, and 'null' values from an object.
 * @param {Object} obj - The object from which null and undefined values should be removed.
 * @returns {Object} - The object without null and undefined values.
 */
function removeNullValues(obj) {
    for (const key in obj) {
        const value = obj[key];

        if (
            value === null ||
            value === undefined ||
            value === '' ||
            value === 'null'
        ) {
            delete obj[key];
        }
    }

    return obj;
}

/**
 * Checks if the request query has attributes representing a 'BETWEEN' condition.
 * @param {Object} requestQuery - The request query object.
 * @param {string} attr - The attribute name.
 * @returns {boolean} - True if 'BETWEEN' attributes are present, false otherwise.
 */
function hasBetweenAttribute(requestQuery, attr) {
    const attributeWithTu = requestQuery[attr[0] + 'Tu' + attr.slice(1)];
    const attributeWithDen = requestQuery[attr[0] + 'Den' + attr.slice(1)];

    return attributeWithTu !== undefined || attributeWithDen !== undefined;
}

module.exports = {
    cleanAndConvert,
    removeNullValues,
    hasBetweenAttribute,
};
