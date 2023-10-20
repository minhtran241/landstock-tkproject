'use strict';

// Function to concatenate two strings with a space in between
const concatWithSpace = (str1, str2) => {
    if (str1 && str2) {
        return `${str1} ${str2}`;
    }
    return str1 || str2;
};

module.exports = {
    concatWithSpace,
};
