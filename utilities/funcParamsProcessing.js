'use strict';

const arrayStats = {
    count: (data, field = '') => {
        if (Array.isArray(data)) {
            return data.length;
        }
        throw new Error('Data is not an array');
    },
    sum: (data, field) => {
        if (Array.isArray(data)) {
            return data.reduce((sum, item) => sum + item[field], 0);
        }
        throw new Error('Data is not an array');
    },
    average: (data, field) => {
        if (Array.isArray(data)) {
            const total = data.reduce((sum, item) => sum + item[field], 0);
            return total / data.length;
        }
        throw new Error('Data is not an array');
    },
};

const extractQueryParameters = (query) => {
    const { func, attr } = query;
    return {
        funcs: func ? func.split(',') : [],
        attr: attr || 'defaultAttribute', // Provide a default attribute name
    };
};

const calculateResults = (funcs, data, attr) => {
    const results = {};

    funcs.forEach((f) => {
        if (arrayStats[f]) {
            results[f] = arrayStats[f](data, attr);
        } else {
            throw new Error(`Invalid function: ${f}`);
        }
    });

    return results;
};

module.exports = {
    extractQueryParameters,
    calculateResults,
};
