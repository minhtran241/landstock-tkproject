'use strict';

// Function to get the attributes to select from the query parameters
const getSelectAttributes = (paramsOperations) => {
    const selectAttributes = [];
    paramsOperations.forEach((po) => {
        if (po.a.includes('s')) {
            selectAttributes.push(po.p);
        }
    });
    return selectAttributes;
};

const getSelectByIdAttributes = (paramsOperations) => {
    const selectAttributes = [];
    paramsOperations.forEach((po) => {
        if (po.sbi) {
            selectAttributes.push(po.p);
        }
    });
    return selectAttributes;
};

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
