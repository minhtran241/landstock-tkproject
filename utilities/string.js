'use strict';

// Function to concatenate two strings with a space in between
const concatWithSpace = (str1, str2) => {
    if (str1 && str2) {
        return `${str1} ${str2}`;
    }
    return str1 || str2;
};

const generateBetweenParams = (attributeName) => {
    const type = attributeName[0];
    const name = attributeName.slice(1);
    const from = `${type}Tu${name}`;
    const to = `${type}Den${name}`;
    return { from, to };
};

module.exports = {
    concatWithSpace,
    generateBetweenParams,
};
