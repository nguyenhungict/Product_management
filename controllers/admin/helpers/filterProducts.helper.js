const searchProducts = require('./searchProducts.helper');

module.exports = (query) => {
    let condition = {};
    
    // Lọc theo trạng thái
    const status = query.status;
    if (status === 'active' || status === 'inactive') {
        condition.status = status;
    }

    // Thêm điều kiện tìm kiếm
    if(query.keyword) {
        const searchCondition = searchProducts(query);
        condition = { ...condition, ...searchCondition };
    }

    return {
        condition,
        currentStatus: status || 'all',
        keyword: query.keyword || ''
    };
};