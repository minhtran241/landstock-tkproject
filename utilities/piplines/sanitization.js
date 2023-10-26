'use strict';

const convertToType = (po, dataToConvert) => {
    const data = dataToConvert.map((item) => {
        const result = Object.entries(item).reduce((acc, [key, value]) => {
            const poItem = po.find((poItem) => poItem.p === key);
            if (poItem.t === 'number') {
                acc[key] = Number(value);
            } else if (poItem.t === 'boolean') {
                acc[key] = value === 'true';
            } else {
                acc[key] = value;
            }
            return acc;
        }, {});
        return result;
    });
    return data;
};

module.exports = {
    convertToType,
};
