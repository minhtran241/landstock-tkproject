'use strict';

const convertToType = (po, dataToConvert) => {
    return dataToConvert.map((entity) => {
        const mapping = po.find((p) => p.p in entity);
        if (mapping) {
            const { p, t } = mapping;
            if (t === 'number') {
                entity[p] = Number(entity[p]);
            } else if (t === 'date') {
                entity[p] = new Date(entity[p]);
            }
        }
        return entity;
    });
};

module.exports = {
    convertToType,
};
