'use strict';

// Function to get attributes by action
const getAttributesByAction = (paramsOperations, action) => {
    const attributes = [];
    paramsOperations.forEach((po) => {
        if (po.a.includes(action)) {
            attributes.push(po.p);
        }
    });
    return attributes;
};

// Function to get the primary key attribute
const getPKAttr = (paramsOperations) => {
    const pkAttr = paramsOperations.find((po) => po.k === true);
    return pkAttr;
};

module.exports = {
    getAttributesByAction,
    getPKAttr,
};
