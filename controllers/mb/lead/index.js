const fs = require('fs');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const httpResponses = require('../../../http/httpResponses');

// Function to sign a new token
const signNewToken = () => {
    // Load the private key
    const privateKey = fs.readFileSync(
        `${__dirname}/certs/private.pem`,
        'utf-8'
    );
    const payload = {
        timestamp: Date.now() / 1000, // Current timestamp
        // iat: Date.now() / 1000, // Issued at timestamp
    };

    // Sign a new token
    return jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '5m',
    });
    // return process.env.MB_API_TOKEN;
};

// Reusable Axios instance
const apiClient = axios.create({
    baseURL: process.env.MB_DEV_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        partnerKey: process.env.MB_PARTNER_KEY,
    },
});

let previousApiToken = signNewToken();

const putLeadLand = async (request, reply) => {
    const { body } = request;
    const mbApiUrl = '/lead/land';

    const currentTimestamp = Date.now();
    const fiveSecondsAgo = currentTimestamp - 5000;

    let apiToken = previousApiToken;

    // If the previous token is older than 5 seconds, sign a new one
    if (jwt.decode(apiToken).timestamp < fiveSecondsAgo) {
        apiToken = signNewToken();
        previousApiToken = apiToken; // Update the previous token
    }

    const headers = {
        Authorization: `Bearer ${apiToken}`,
        ...apiClient.defaults.headers,
    };

    console.log(apiToken);

    try {
        const { status, data } = await apiClient.put(mbApiUrl, body, {
            headers,
        });

        return reply.code(status).send(data);
    } catch (error) {
        if (
            error.response &&
            error.response.status === httpResponses.UNAUTHORIZED.code
        ) {
            // If the request fails due to an invalid token, sign a new one and try again
            apiToken = signNewToken();
            headers.Authorization = `Bearer ${apiToken}`;
            const { status, data } = await apiClient.put(mbApiUrl, body, {
                headers,
            });

            return reply.code(status).send(data);
        }
        console.log(error);
        return reply.code(error.response.status).send(error.response.data);
    }
};

module.exports = {
    putLeadLand,
};
