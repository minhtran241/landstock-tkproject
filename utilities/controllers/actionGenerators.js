'use strict';

/**
 * Gets attributes by action.
 * @param {Array} paramsOperations - The array of parameter operations.
 * @param {string} action - The action to filter attributes.
 * @returns {Array} - An array of attributes based on the specified action.
 */
const getAttributesByAction = (paramsOperations, action) => {
    const attributes = [];
    paramsOperations.forEach((po) => {
        if (po.a.includes(action) && !po.isFile) {
            attributes.push(po.p);
        }
    });
    return attributes;
};

/**
 * Gets the primary key attribute.
 * @param {Array} paramsOperations - The array of parameter operations.
 * @returns {Object|null} - The primary key attribute or null if not found.
 */
const getPKAttr = (paramsOperations) => {
    return paramsOperations.find((po) => po.k === true) || null;
};

/**
 * Gets file attributes by action.
 * @param {Array} paramsOperations - The array of parameter operations.
 * @param {string} action - The action to filter file attributes.
 * @returns {Array} - An array of file attributes based on the specified action.
 */
const getFileAttrs = (paramsOperations, action) => {
    return paramsOperations.filter(
        (po) => po.isFile === true && po.a.includes(action)
    );
};

module.exports = {
    getAttributesByAction,
    getPKAttr,
    getFileAttrs,
};
