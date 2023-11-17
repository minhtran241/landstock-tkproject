'use strict';

/**
 * Module for defining constants related to numeric limits and table names.
 * @module Constants
 */

/**
 * The maximum value for a 64-bit unsigned integer.
 * @constant {string}
 */
const MAX_UINT64 = '18446744073709551615';

/**
 * Maximum limit for small tables.
 * @constant {number}
 */
const SMALL_MAX_LIMIT = 20;

/**
 * Maximum limit for large tables.
 * @constant {number}
 */
const BIG_MAX_LIMIT = 1000;

/**
 * Maximum offset for small tables.
 * @constant {number}
 */
const SMALL_MAX_OFFSET = SMALL_MAX_LIMIT * SMALL_MAX_LIMIT;

/**
 * Maximum offset for large tables.
 * @constant {number}
 */
const BIG_MAX_OFFSET = BIG_MAX_LIMIT * BIG_MAX_LIMIT;

/**
 * Tables with a small limit.
 * @constant {Array}
 */
const SMALL_LIMIT_TABLES = [
    `${process.env.CLIENT_CODE}_BDS`,
    `${process.env.CLIENT_CODE}_KhachHang`,
];

module.exports = {
    MAX_UINT64,
    SMALL_MAX_LIMIT,
    BIG_MAX_LIMIT,
    SMALL_MAX_OFFSET,
    BIG_MAX_OFFSET,
    SMALL_LIMIT_TABLES,
};
