'use strict';

const httpResponses = require('../../http/httpResponses');

const poToObjSchema = (po, action, type = 'object') => {
    return {
        type,
        properties: createObjectFromFilteredArray(po, action),
    };
};

const createObjectFromFilteredArray = (po, action) => {
    const filteredArray = po.filter((poItem) => poItem.a.includes(action));

    const result = filteredArray.reduce((acc, poItem) => {
        acc[poItem.p] = { type: poItem.t };
        return acc;
    }, {});

    return result;
};

const createMessageResponse = () => {
    const firstKey = Object.keys(httpResponses)[0];
    const structureObject = {};
    for (const key in httpResponses[firstKey]) {
        if (httpResponses[firstKey].hasOwnProperty(key)) {
            structureObject[key] = {
                type: typeof httpResponses[firstKey][key],
            };
        }
    }
    return {
        type: 'object',
        properties: structureObject,
    };
};

const getSchemaGenerator = (po, action, type, requestHandler) => {
    const responseObjSchema = poToObjSchema(po, action, type);
    const responseMessageSchema = createMessageResponse();
    const response200 = responseObjSchema;
    const response404 = responseMessageSchema;
    const response500 = responseMessageSchema;

    return {
        schema: {
            response: { 200: response200, 404: response404, 500: response500 },
        },
        handler: requestHandler,
    };
};

const postSchemaGenerator = (po, action, requestHandler) => {
    const requestBodySchema = poToObjSchema(po, action, 'array');
    const responseMessageSchema = createMessageResponse();
    const response201 = responseMessageSchema;
    const response500 = responseMessageSchema;

    const responseSchema = {
        201: response201,
        500: response500,
    };

    return {
        schema: {
            body: requestBodySchema,
            response: responseSchema,
        },
        handler: requestHandler,
    };
};

const deleteSchemaGenerator = (requestHandler) => {
    const responseMessageSchema = createMessageResponse();
    const response200 = responseMessageSchema;
    const response500 = responseMessageSchema;

    const responseSchema = {
        200: response200,
        500: response500,
    };

    return {
        schema: {
            response: responseSchema,
        },
        handler: requestHandler,
    };
};

const getFuncSchemaGenerator = (requestHandler) => {
    const response200 = {
        type: 'object',
        properties: {
            value: { type: 'number' },
        },
    };
    const responseMessageSchema = createMessageResponse();
    const response404 = responseMessageSchema;
    const response500 = responseMessageSchema;

    return {
        schema: {
            response: { 200: response200, 404: response404, 500: response500 },
        },
        handler: requestHandler,
    };
};

module.exports = {
    getSchemaGenerator,
    postSchemaGenerator,
    deleteSchemaGenerator,
    getFuncSchemaGenerator,
};
