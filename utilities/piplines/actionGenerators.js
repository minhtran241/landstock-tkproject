'use strict';

// Function to get attributes by action (select by id)
const getSelectByIdAttributes = (paramsOperations) => {
    const selectAttributes = [];
    paramsOperations.forEach((po) => {
        if (po.sbi) {
            selectAttributes.push(po.p);
        }
    });
    return selectAttributes;
};

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

module.exports = {
    getAttributesByAction,
    getSelectByIdAttributes,
};
