'use strict';

const { MAX_LIMIT, MAX_OFFSET } = require('../constants');

const convertToType = (po, dataToConvert) => {
    dataToConvert.forEach((data) => {
        Object.entries(data).forEach(([key, value]) => {
            const poItem = po.find((poItem) => poItem.p === key);
            if (poItem) {
                if (poItem.t === 'number') {
                    data[key] = Number(value);
                } else if (poItem.t === 'boolean') {
                    data[key] = Boolean(value);
                }
            }
        });
    });
};

const sanitizeLimitAndOffset = (requestQuery) => {
    const limit = Math.min(Number(requestQuery.limit), MAX_LIMIT) || MAX_LIMIT;
    const skip = Math.min(Number(requestQuery.skip), MAX_OFFSET) || 0;

    return { limit, skip };
};

const sanitizeGetFuncResponse = (data, func) => {
    if (data !== null && func !== null) {
        return {
            value: Number(data[0][`${func}()`]),
        };
    } else {
        throw new Error('Data not found');
    }
};

module.exports = {
    convertToType,
    sanitizeLimitAndOffset,
    sanitizeGetFuncResponse,
};
