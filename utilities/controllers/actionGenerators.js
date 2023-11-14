'use strict';

// Function to get attributes by action
const getAttributesByAction = (paramsOperations, action) => {
    const attributes = [];
    paramsOperations.forEach((po) => {
        if (po.a.includes(action) && !po.isFile) {
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

const getFileAttrs = (paramsOperations, action) => {
    const fileAttrs = paramsOperations.filter(
        (po) => po.isFile === true && po.a.includes(action)
    );
    return fileAttrs;
};

module.exports = {
    getAttributesByAction,
    getPKAttr,
    getFileAttrs,
};
