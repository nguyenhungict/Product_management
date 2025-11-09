const Product = require('../../models/product.model');
const filterProducts = require('./helpers/filterProducts.helper');

module.exports.index = async (req, res) => {
    try {
        // Lấy điều kiện lọc và tìm kiếm
        const { condition, currentStatus, keyword } = filterProducts(req.query);

        // Query với điều kiện đã lọc
        const products = await Product.find(condition);
        
        // Render và truyền đầy đủ biến
        res.render('admin/pages/products/index', {
            pageTitle: 'Danh sách sản phẩm',
            products,
            pageActive: 'products',
            currentStatus,
            keyword
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send('Có lỗi xảy ra: ' + error.message);
    }
};

// [GET] /change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    
}