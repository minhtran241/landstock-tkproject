'use strict';

const {
    getAllEntries,
    getEntryById,
    postEntry,
    deleteEntry,
} = require('../../../controllers/loaihang');

// section/LoaiHang schema
const Section = {
    type: 'object',
    properties: {
        sCode: { type: 'string' },
        sTen: { type: 'string' },
    },
};

const getSectionsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                sections: Section,
            },
        },
    },
    handler: getAllEntries,
};

const getSectionByCodeOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                sections: Section,
            },
        },
    },
    handler: getEntryById,
};

const postSectionOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                sCode: { type: 'string' },
                sTen: { type: 'string' },
            },
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    },
    handler: postEntry,
};

const deleteSectionOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    },
    handler: deleteEntry,
};

module.exports = async function (fastify, opts) {
    fastify.get('/', getSectionsOpts);
    fastify.get('/:id', getSectionByCodeOpts);
    fastify.post('/', postSectionOpts);
    fastify.delete('/:id', deleteSectionOpts);
};
