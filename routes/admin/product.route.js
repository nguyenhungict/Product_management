
const express = require('express');
const router = express.Router();
const productController = require('../../controllers/admin/product.controller');

// GET /admin/products
router.get('/', productController.index);

router.get("/change-status/:status/:id", productController.changeStatus); 

module.exports = router;

