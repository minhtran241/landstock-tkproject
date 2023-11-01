'use strict';

const moment = require('moment');

// Function to clean and convert values
function cleanAndConvert(values) {
    const cleanedValues = {};
    for (const key in values) {
        if (
            values[key] !== null ||
            values[key] !== undefined ||
            values[key] !== '' ||
            values[key] !== 'null'
        ) {
            if (key.startsWith('i') || key.startsWith('f')) {
                // Convert numeric attributes to numbers
                cleanedValues[key] = Number(values[key]);
            } else if (key.startsWith('s') && key.endsWith('s')) {
                // Convert string array attributes to string arrays. Example: sFiles
                cleanedValues[key] = values[key].split(',');
            } else if (key.startsWith('s')) {
                console.log({ key, value: values[key] });
                // Convert string attributes to strings
                cleanedValues[key] = String(values[key]);
            } else if (key.startsWith('b')) {
                // Convert boolean attributes to boolean
                cleanedValues[key] = Boolean(values[key]);
            } else if (key.startsWith('d')) {
                // Convert date attributes to date
                cleanedValues[key] = moment(values[key]).format(
                    'YYYY-MM-DD HH:mm:ss'
                );
            } else {
                // Keep other attributes as-is
                cleanedValues[key] = values[key];
            }
        }
    }
    return cleanedValues;
}

// Function to remove null or undefined values from an object
function removeNullValues(obj) {
    for (const key in obj) {
        if (
            obj[key] === null ||
            obj[key] === undefined ||
            obj[key] === '' ||
            obj[key] === 'null'
        ) {
            delete obj[key];
        }
    }
    return obj;
}

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
