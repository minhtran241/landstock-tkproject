'use strict';

const {
    SMALL_LIMIT_TABLES,
    SMALL_MAX_LIMIT,
    SMALL_MAX_OFFSET,
    BIG_MAX_LIMIT,
    BIG_MAX_OFFSET,
} = require('../constants');

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

const sanitizeLimitAndOffset = (requestQuery, table) => {
    const maxLimit = SMALL_LIMIT_TABLES.includes(table)
        ? SMALL_MAX_LIMIT
        : BIG_MAX_LIMIT;
    const maxOffset = SMALL_LIMIT_TABLES.includes(table)
        ? SMALL_MAX_OFFSET
        : BIG_MAX_OFFSET;

    const limit = Math.min(Number(requestQuery.limit) || maxLimit, maxLimit);
    const skip = Math.min(Number(requestQuery.skip) || 0, maxOffset);

    return { limit, skip };
};

const sanitizeGetFuncResponse = (data, func) => {
    if (data !== null && func !== null) {
        return {
            value: data[0][`${func}()`],
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
