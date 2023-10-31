'use strict';

const {
    BDS_MAX_LIMIT,
    BDS_MAX_OFFSET,
    ALL_MAX_LIMIT,
    ALL_MAX_OFFSET,
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
    let limit, skip;
    if (table === 'tb_BDS') {
        limit =
            Math.min(Number(requestQuery.limit), BDS_MAX_LIMIT) ||
            BDS_MAX_LIMIT;
        skip = Math.min(Number(requestQuery.skip), BDS_MAX_OFFSET) || 0;
    } else {
        limit =
            Math.min(Number(requestQuery.limit), ALL_MAX_LIMIT) ||
            ALL_MAX_LIMIT;
        skip = Math.min(Number(requestQuery.skip), ALL_MAX_OFFSET) || 0;
    }
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
