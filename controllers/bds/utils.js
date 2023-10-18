'use strict';

// Define the maximum value for a 64-bit unsigned integer
const maxUInt64 = '18446744073709551615';

// Main function to construct the SQL query
const getRealEstatesQuery = (request, table, getRealEstatesReply) => {
    const rq = request.query;
    // Initialize the WHERE clause
    let where = '';

    if (rq) {
        // Define an array of objects that map the query parameters to the SQL operators
        const paramsOperations = [
            { p: 'iID_MaTinh', o: 'IN' },
            { p: 'iID_MaQuan', o: 'IN' },
            { p: 'sLoaiHang', o: 'IN' },
            { p: 'iTuDienTich', o: '>=' },
            { p: 'iDenDienTich', o: '<=' },
            { p: 'iTuTang', o: '>=' },
            { p: 'iDenTang', o: '<=' },
            { p: 'iTuMatTien', o: '>=' },
            { p: 'iDenMatTien', o: '<=' },
            { p: 'iTuGia', o: '>=' },
            { p: 'iDenGia', o: '<=' },
            { p: 'iID_HuongNha', o: 'IN' },
            { p: 'iSoPhongNgu', o: 'IN' },
            { p: 'iSoToilet', o: 'IN' },
            { p: 'sMa', o: 'IN' },
        ];

        paramsOperations.forEach((po) => {
            const value = rq[po.p];
            if (value) {
                // Use the paramToCondition function to convert the parameter and its value into a SQL condition
                where = concatWithSpace(where, paramToCondition(po, value));
            }
        });
    }

    // Add the LIMIT and OFFSET clauses
    const { skip, limit } = rq;
    const skipValue = skip || 0;
    const limitValue = limit || maxUInt64;

    // Construct the final SQL query
    const query = `SELECT ${getRealEstatesReply} FROM ${table} WHERE 1 = 1 ${where} LIMIT ${limitValue} OFFSET ${skipValue}`;

    return query;
};

// Define a function to convert a parameter and its value into a SQL condition
const paramToCondition = (po, v) => {
    // Check if the operator is 'IN'; if so, create a condition with comma-separated values enclosed in parentheses
    const condition =
        po.o === 'IN'
            ? `(${v
                  .split(',')
                  .map((value) => `'${value}'`)
                  .join(',')})`
            : v; // If the operator is not 'IN', use the value as is
    let ta = po.p;
    if (po.o === '>=' || po.o === '<=') {
        ta = ta.replace('Tu', '').replace('Den', '');
    }
    return `AND ${ta} ${po.o} ${condition}`; // Return the SQL condition
};

// Function to remove null or undefined values from an object
function removeNullValues(obj) {
    for (const key in obj) {
        if (obj[key] === null || obj[key] === undefined) {
            delete obj[key];
        }
    }
    return obj;
}

// Function to concatenate two strings with a space in between
const concatWithSpace = (str1, str2) => {
    if (str1 && str2) {
        return `${str1} ${str2}`;
    }
    return str1 || str2;
};

module.exports = {
    getRealEstatesQuery,
    removeNullValues,
};
