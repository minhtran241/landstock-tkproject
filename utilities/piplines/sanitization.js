'use strict';

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

module.exports = {
    convertToType,
    sanitizeLimitAndOffset,
};
