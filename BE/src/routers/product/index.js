'use strict'

const express = require('express');
const ProductController = require('../../controllers/product.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, authenticationV2, isAdmin } = require('../../auth/authUtils');

//authentication token
router.use(authentication);

//role admin
router.use(isAdmin);

router.post('/create-product', asyncHandler(ProductController.createNewProduct));
router.get('/list', asyncHandler(ProductController.searchProduct));
router.put('/update', asyncHandler(ProductController.updateProduct));
router.delete('/delete/:id', asyncHandler(ProductController.deleteProduct));

//authentication refreshToken
// router.use(authenticationV2);


module.exports = router;