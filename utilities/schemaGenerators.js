'use strict';

const poToObjSchema = (po, action) => {
    return {
        type: 'object',
        properties: po
            .filter((po) => po.a.includes(action))
            .map((po) => ({ [po.p]: { type: po.t } })),
    };
};

const createMessageResponse = () => {
    return {
        type: 'object',
        properties: {
            message: { type: 'string' },
        },
    };
};

const getSchemaGenerator = (po, action, responseType, requestHandler) => {
    const responseObjSchema = poToObjSchema(po, action);
    const response200 = {
        type: responseType,
        obj: responseObjSchema,
    };

    return {
        schema: { response: { 200: response200 } },
        handler: requestHandler,
    };
};

const postSchemaGenerator = (po, action, requestHandler) => {
    const requestBodySchema = poToObjSchema(po, action);
    const responseSchema = {
        201: createMessageResponse(),
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
    const responseSchema = {
        200: createMessageResponse(),
    };

    return {
        schema: {
            response: responseSchema,
        },
        handler: requestHandler,
    };
};

module.exports = {
    poToObjSchema,
    createMessageResponse,
    getSchemaGenerator,
    postSchemaGenerator,
    deleteSchemaGenerator,
};
