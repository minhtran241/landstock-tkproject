'use strict';

// Function to concatenate two strings with a space in between
const concatWithSpace = (str1, str2) => {
    if (str1 && str2) {
        return `${str1} ${str2}`;
    }
    return str1 || str2;
};

// Function to generate between parameters from an attribute name
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
