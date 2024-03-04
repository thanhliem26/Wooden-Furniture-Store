'use strict'

const express = require('express');
const MarkdownController = require('../../controllers/markdown.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, authenticationV2, isAdmin } = require('../../auth/authUtils');

//authentication token
router.use(authentication);

// router.get('/top-product', asyncHandler(MarkdownController.getTopProduct));
// router.get('/get-range-price', asyncHandler(MarkdownController.getRangePrice));
// router.get('/list', asyncHandler(MarkdownController.searchProduct));
// router.get('/list-different-product', asyncHandler(MarkdownController.listDifferent));
// router.get('/:id', asyncHandler(MarkdownController.getProductById));


//role admin
router.use(isAdmin);

router.post('/create', asyncHandler(MarkdownController.createNewProduct));
// router.put('/update', asyncHandler(MarkdownController.updateProduct));
// router.delete('/delete/:id', asyncHandler(MarkdownController.deleteProduct));

//authentication refreshToken
// router.use(authenticationV2);


module.exports = router;