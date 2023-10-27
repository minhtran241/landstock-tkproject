'use strict';

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

const createMessageResponse = {
    type: 'object',
    properties: {
        message: { type: 'string' },
    },
};

const getSchemaGenerator = (po, action, type, requestHandler) => {
    const responseObjSchema = poToObjSchema(po, action, type);
    // const responseObjSchemaWithCount = {
    //     type: 'object',
    //     properties: {
    //         data: responseObjSchema,
    //         count: { type: 'number' },
    //         limit: { type: 'number' },
    //         skip: { type: 'number' },
    //     },
    // };
    const response200 = {
        type: 'object',
        properties: {
            response: {
                oneOf: [
                    {
                        data: responseObjSchema,
                        count: { type: 'number' },
                        limit: { type: 'number' },
                        skip: { type: 'number' },
                    },
                    createObjectFromFilteredArray(po, action),
                ],
            },
        },
    };
    const response404 = createMessageResponse;
    const response500 = createMessageResponse;

    return {
        schema: {
            response: { 200: response200, 404: response404, 500: response500 },
        },
        handler: requestHandler,
    };
};

const postSchemaGenerator = (po, action, requestHandler) => {
    const requestBodySchema = poToObjSchema(po, action);
    const response201 = createMessageResponse;
    const response500 = createMessageResponse;

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
    const response200 = createMessageResponse;
    const response500 = createMessageResponse;

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

module.exports = {
    getSchemaGenerator,
    postSchemaGenerator,
    deleteSchemaGenerator,
};
