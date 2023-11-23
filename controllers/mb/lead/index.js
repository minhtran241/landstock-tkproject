const fs = require('fs');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const httpResponses = require('../../../http/httpResponses');

// Constants for configuration
const PRIVATE_KEY_PATH = `${__dirname}/certs/private.pem`;
const TOKEN_EXPIRATION = '5m';
const TOKEN_REFRESH_THRESHOLD = 5; // seconds

/**
 * Function to sign a new JWT token.
 * @returns {string} - The signed JWT token.
 */
const signNewToken = () => {
    // Load the private key
    const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, 'utf-8');

    // Get the current timestamp in seconds
    const currentTimestamp = Math.floor(Date.now() / 1000);

    // Create payload for the JWT token
    const payload = {
        timestamp: currentTimestamp,
        iat: currentTimestamp,
        partner: process.env.MB_PARTNER_KEY,
    };

    const start_time = new Date().getTime();
    // Sign a new token with RS256 algorithm and a 5-minute expiration
    const newToken = jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: TOKEN_EXPIRATION,
    });
    const end_time = new Date().getTime();
    console.log({
        start_time,
        end_time,
        duration: end_time - start_time,
        newToken,
    });
    return newToken;
};

// Reusable Axios instance with default headers
const apiClient = axios.create({
    baseURL: process.env.MB_DEV_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        partnerKey: process.env.MB_PARTNER_KEY,
    },
});

// Initialize the previous API token with a new one
let previousApiToken = signNewToken();

/**
 * Handler for the "putLeadLand" route.
 * @param {Object} request - The Fastify request object.
 * @param {Object} reply - The Fastify reply object.
 * @returns {Object} - The API response.
 */
const putLeadLand = async (request, reply) => {
    // Extract the request body
    const { body } = request;

    // API endpoint for the lead/land operation
    const mbApiUrl = '/lead/land';

    // Get the current timestamp in seconds
    const currentTimestamp = Math.floor(Date.now() / 1000);

    // Initialize API token with the previous one
    let apiToken = previousApiToken;

    // If the previous token is older than the refresh threshold, sign a new one
    if (
        jwt.decode(apiToken).timestamp <
        currentTimestamp - TOKEN_REFRESH_THRESHOLD
    ) {
        apiToken = signNewToken();
        previousApiToken = apiToken; // Update the previous token
    }

    // Construct headers for the API request
    const headers = {
        Authorization: `Bearer ${apiToken}`,
        ...apiClient.defaults.headers,
    };

    try {
        // Make a PUT request to the API with the constructed headers
        const { status, data } = await apiClient.put(mbApiUrl, body, {
            headers,
        });

        // Respond with the API response
        return reply.code(status).send(data);
    } catch (error) {
        // Handle unauthorized errors by refreshing the token and retrying the request
        if (
            error.response &&
            error.response.status === httpResponses.UNAUTHORIZED.code
        ) {
            apiToken = signNewToken();
            previousApiToken = apiToken; // Update the previous token
            headers.Authorization = `Bearer ${apiToken}`;

            // Retry the request with the new token
            const { status, data } = await apiClient.put(mbApiUrl, body, {
                headers,
            });
            return reply.code(status).send(data);
        }

        // Log and respond with the error details
        console.error(error);
        return reply
            .code(
                error.response?.status ||
                    httpResponses.INTERNAL_SERVER_ERROR.code
            )
            .send(error.response?.data || httpResponses.INTERNAL_SERVER_ERROR);
    }
};

// Export the handler for external use
module.exports = {
    putLeadLand,
};
