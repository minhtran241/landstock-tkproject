'use strict';

// Define the maximum value for a 64-bit unsigned integer
const MAX_UINT64 = '18446744073709551615';
const BDS_MAX_LIMIT = 20;
const ALL_MAX_LIMIT = 100;
const BDS_MAX_OFFSET = BDS_MAX_LIMIT * BDS_MAX_LIMIT;
const ALL_MAX_OFFSET = ALL_MAX_LIMIT * ALL_MAX_LIMIT;

module.exports = {
    MAX_UINT64,
    BDS_MAX_LIMIT,
    ALL_MAX_LIMIT,
    BDS_MAX_OFFSET,
    ALL_MAX_OFFSET,
};
