const Product = require('../../models/product.model');

module.exports.index = async (req, res) => {
    try {
        console.log("Da vao controller");
        
        // Kiểm tra kết nối database
        if (Product.db.readyState !== 1) {
            console.log("Database chua ket noi!");
            return res.status(500).send("Database chua ket noi!");
        }
        
        console.log("Database da ket noi thanh cong");
        
        const products = await Product.find({});

        // Tính toán giá mới cho từng sản phẩm
        products.forEach(item => {
            if (item.discountPercentage && item.discountPercentage > 0) {
                item.priceNew = Math.round((item.price * (1 - item.discountPercentage / 100)) * 100) / 100;
            } else {
                item.priceNew = item.price;
            }
        });
        
        // console.log("So luong san pham tim thay:", products.length);
        // console.log("Danh sach san pham:", products);
        
        res.render("client/pages/products/index", {
            pageTitle: "Danh sach san pham",
            products: products
        });
        
    } catch (error) {
        console.error("Loi trong controller:", error);
        res.status(500).send("Co loi xay ra: " + error.message);
    }
}

