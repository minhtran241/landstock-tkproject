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

module.exports = {
    convertToType,
};
