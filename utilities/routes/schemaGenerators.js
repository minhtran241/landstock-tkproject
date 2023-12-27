'use strict';

/**
 * Module for generating Fastify route schemas based on predefined parameter objects.
 * @module SchemaGenerators
 */

const httpResponses = require('../../http/httpResponses');

/**
 * Generates an object schema based on a parameter object, action, and type.
 * @param {Array} po - Parameter object specifying types and actions.
 * @param {string} action - Action for which the schema is generated.
 * @param {string} [type='object'] - Type of the generated schema.
 * @returns {Object} - Generated schema object.
 */
const poToObjSchema = (po, action, type = 'object') => {
    return {
        type,
        properties: createObjectFromFilteredArray(po, action),
    };
};

/**
 * Creates an object schema from a filtered parameter object array based on the provided action.
 * @param {Array} po - Parameter object specifying types and actions.
 * @param {string} action - Action for filtering the parameter object.
 * @returns {Object} - Generated object schema.
 */
const createObjectFromFilteredArray = (po, action) => {
    const filteredArray = po.filter((poItem) => poItem.a.includes(action));

    const result = filteredArray.reduce((acc, poItem) => {
        acc[poItem.p] = { type: poItem.t };
        return acc;
    }, {});

    return result;
};

/**
 * Creates a message response schema based on predefined HTTP responses.
 * @returns {Object} - Generated message response schema.
 */
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

/**
 * Generates a schema for GET requests based on the provided parameter object, action, type, and request handler.
 * @param {Array} po - Parameter object specifying types and actions.
 * @param {string} action - Action for which the schema is generated.
 * @param {string} type - Type of the generated schema.
 * @param {Function} requestHandler - Request handler function for the route.
 * @returns {Object} - Generated schema object for GET requests.
 */
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

/**
 * Generates a schema for POST requests based on the provided parameter object, action, and request handler.
 * @param {Array} po - Parameter object specifying types and actions.
 * @param {string} action - Action for which the schema is generated.
 * @param {Function} requestHandler - Request handler function for the route.
 * @returns {Object} - Generated schema object for POST requests.
 */
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

/**
 * Generates a schema for DELETE requests based on the provided request handler.
 * @param {Function} requestHandler - Request handler function for the route.
 * @returns {Object} - Generated schema object for DELETE requests.
 */
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

/**
 * Generates a schema for GET function requests based on the provided request handler.
 * @param {Function} requestHandler - Request handler function for the route.
 * @returns {Object} - Generated schema object for GET function requests.
 */
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
            response: { 404: response404, 500: response500 },
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
