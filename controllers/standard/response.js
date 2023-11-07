'use strict';

const response = {
    OK: {
        statusCode: 200,
        code: 'OK',
        error: '',
        message: 'Request successful',
    },
    CREATED: {
        statusCode: 201,
        code: 'CREATED',
        error: '',
        message: 'Resource created',
    },
    BAD_REQUEST: {
        statusCode: 400,
        code: 'BAD_REQUEST',
        error: 'Bad Request',
        message: 'The request could not be understood by the server.',
    },
    FORBIDDEN_ACCESS: {
        statusCode: 403,
        code: 'FORBIDDEN_ACCESS',
        error: 'Forbidden',
        message: 'You do not have permission to access this resource',
    },
    NOT_FOUND: {
        statusCode: 404,
        code: 'NOT_FOUND',
        error: 'Not Found',
        message: 'The requested resource was not found',
    },
    INTERNAL_SERVER_ERROR: {
        statusCode: 500,
        code: 'INTERNAL_SERVER_ERROR',
        error: 'Internal Server Error',
        message: 'An internal server error occurred, please try again later.',
    },
};

module.exports = responseMessage;
