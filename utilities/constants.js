'use strict';

// Define the maximum value for a 64-bit unsigned integer
const MAX_UINT64 = '18446744073709551615';
const SMALL_MAX_LIMIT = 20;
const BIG_MAX_LIMIT = 1000;
const SMALL_MAX_OFFSET = SMALL_MAX_LIMIT * SMALL_MAX_LIMIT;
const BIG_MAX_OFFSET = BIG_MAX_LIMIT * BIG_MAX_LIMIT;
const SMALL_LIMIT_TABLES = ['tb_BDS', 'tb_KhachHang'];

module.exports = {
    MAX_UINT64,
    SMALL_MAX_LIMIT,
    BIG_MAX_LIMIT,
    SMALL_MAX_OFFSET,
    BIG_MAX_OFFSET,
    SMALL_LIMIT_TABLES,
};
