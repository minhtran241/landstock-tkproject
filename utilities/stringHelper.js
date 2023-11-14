'use strict';

/**
 * Concatenates two strings with a space in between.
 * @param {string} str1 - The first string.
 * @param {string} str2 - The second string.
 * @returns {string} - The concatenated string with a space in between.
 */
const concatWithSpace = (str1, str2) => {
    return str1 && str2 ? `${str1} ${str2}` : str1 || str2;
};

/**
 * Generates 'BETWEEN' parameters from an attribute name.
 * @param {string} attributeName - The attribute name.
 * @returns {Object} - An object with 'from' and 'to' properties representing the 'BETWEEN' parameters.
 */
const generateBetweenParams = (attributeName) => {
    const [type, ...name] = attributeName;
    const from = `${type}Tu${name.join('')}`;
    const to = `${type}Den${name.join('')}`;
    return { from, to };
};

module.exports = {
    concatWithSpace,
    generateBetweenParams,
};
