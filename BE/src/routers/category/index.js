'use strict'

const express = require('express');
const CategoryController = require('../../controllers/category.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, authenticationV2, isAdmin } = require('../../auth/authUtils');

//authentication token
router.use(authentication);

//role admin
router.use(isAdmin);

router.post('/create-category', asyncHandler(CategoryController.createNewCategory));
router.get('/list', asyncHandler(CategoryController.searchCategory));
router.put('/update', asyncHandler(CategoryController.updateCategory));
router.delete('/delete/:id', asyncHandler(CategoryController.deleteCategory));

//authentication refreshToken
// router.use(authenticationV2);


module.exports = router;