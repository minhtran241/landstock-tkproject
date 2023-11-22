const fs = require('fs');
const axios = require('axios');
const httpResponses = require('../../../http/httpResponses');
const jwt = require('jsonwebtoken');

// Function to sign a new token
const signNewToken = () => {
    // Load the private key
    const privateKey = fs.readFileSync(
        `${__dirname}/certs/private.pem`,
        'utf-8'
    );
    const payload = {
        timestamp: Date.now(),
        iat: Math.floor(Date.now() / 1000),
    };

    // Sign a new token
    return jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
    });
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

const postToLead = async (request, reply) => {
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

    try {
        const res = await apiClient.put(mbApiUrl, body, {
            headers,
        });

        return reply.code(res.status).send(res.data);
    } catch (error) {
        if (
            error.response &&
            error.response.status === httpResponses.UNAUTHORIZED.code
        ) {
            // If the request fails due to an invalid token, sign a new one and try again
            apiToken = signNewToken();
            headers.Authorization = `Bearer ${apiToken}`;
            const { data, status } = await apiClient.put(mbApiUrl, body, {
                headers,
            });

            return reply.code(status).send(data);
        }
        console.log(error);
        throw error; // Propagate other errors
    }
};

module.exports = {
    postToLead,
};
