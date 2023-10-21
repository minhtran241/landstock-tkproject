'use strict';

const {
    getSections,
    getSectionByCode,
    postSection,
    deleteSection,
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
    handler: getSections,
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
    handler: getSectionByCode,
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
    handler: postSection,
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
    handler: deleteSection,
};

module.exports = async function (fastify, opts) {
    fastify.get('/', getSectionsOpts);
    fastify.get('/:code', getSectionByidOpts);
    fastify.post('/', postSectionOpts);
    fastify.delete('/:id', deleteSectionOpts);
};
