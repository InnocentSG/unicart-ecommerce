const router = require('express').Router();
const { getAllProducts, getProductById, getRelatedProducts, createProduct } = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/related/:category', getRelatedProducts);
router.post('/', createProduct);

module.exports = router;
