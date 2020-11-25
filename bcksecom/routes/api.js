const express = require('express');
const router = express.Router();
const productosRoutes = require('./api/productosdb');



router.use('/productos', productosRoutes);

module.exports = router;