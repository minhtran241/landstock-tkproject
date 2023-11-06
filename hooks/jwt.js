'use strict';

// Common onRequest hook for routes requiring JWT verification
const jwtVerifyHook = { onRequest: [fastify.verifyJWT] };

module.exports = {
    jwtVerifyHook,
};
