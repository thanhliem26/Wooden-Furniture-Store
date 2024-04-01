'use strict'

const express = require('express');
const CategoryController = require('../../controllers/category.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, isAdmin } = require('../../auth/authUtils');

//authentication token
router.use(authentication);
router.get('/list', asyncHandler(CategoryController.searchCategory));

//role admin
router.use(isAdmin);

router.post('/create-category', asyncHandler(CategoryController.createNewCategory));
router.put('/update', asyncHandler(CategoryController.updateCategory));
router.delete('/delete/:id', asyncHandler(CategoryController.deleteCategory));

module.exports = router;