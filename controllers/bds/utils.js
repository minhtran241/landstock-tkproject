'use strict';

const maxUInt64 = '18446744073709551615';

const getRealEstatesQuery = (request, getRealEstatesReply) => {
    const {
        skip,
        limit,
        iID_MaTinh,
        iID_MaQuan,
        sLoaiHang,
        iTuDienTich,
        iDenDienTich,
        iTuTang,
        iDenTang,
        iTuMatTien,
        iDenMatTien,
        iTuGia,
        iDenGia,
        iID_HuongNha,
        iSoPhongNgu,
        iSoToilet,
        sMa,
    } = request.query; // Extract skip and limit from the request query parameters

    // Set default values for skip and limit if they are not provided
    const skipValue = skip || 0;
    const limitValue = limit || maxUInt64; // Use the maximum UInt64 value for unlimited

    const query = `SELECT ${getRealEstatesReply} FROM ${table}`;
    if (iID_MaTinh) {
        query = concatWithSpace(query, `WHERE iID_MaTinh = ${iID_MaTinh}`);
    }
    if (iID_MaQuan) {
        query = concatWithSpace(query, `AND iID_MaQuan = ${iID_MaQuan}`);
    }
    if (sLoaiHang) {
        query = concatWithSpace(query, `AND sLoaiHang = ${sLoaiHang}`);
    }
    if (iTuDienTich) {
        query = concatWithSpace(query, `AND iDienTich >= ${iTuDienTich}`);
    }
    if (iDenDienTich) {
        query = concatWithSpace(query, `AND iDienTich <= ${iDenDienTich}`);
    }
    if (iTuTang) {
        query = concatWithSpace(query, `AND iSoTang >= ${iTuTang}`);
    }
    if (iDenTang) {
        query = concatWithSpace(query, `AND iSoTang <= ${iDenTang}`);
    }
    if (iTuMatTien) {
        query = concatWithSpace(query, `AND iMatTien >= ${iTuMatTien}`);
    }
    if (iDenMatTien) {
        query = concatWithSpace(query, `AND iMatTien <= ${iDenMatTien}`);
    }
    if (iTuGia) {
        query = concatWithSpace(query, `AND iGiaChaoHopDong >= ${iTuGia}`);
    }
    if (iDenGia) {
        query = concatWithSpace(query, `AND iGiaChaoHopDong <= ${iDenGia}`);
    }
    if (iID_HuongNha) {
        query = concatWithSpace(query, `AND iID_HuongNha = ${iID_HuongNha}`);
    }
    if (iSoPhongNgu) {
        query = concatWithSpace(query, `AND iSoPhongNgu = ${iSoPhongNgu}`);
    }
    if (iSoToilet) {
        query = concatWithSpace(query, `AND iSoToilet = ${iSoToilet}`);
    }
    if (sMa) {
        query = concatWithSpace(query, `AND sMa = ${sMa}`);
    }

    query = concatWithSpace(query, `LIMIT ${limitValue} OFFSET ${skipValue}`);
    return query;
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
