'use strict'

const express = require('express');
const OrderDetailController = require('../../controllers/orderDetail.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, authenticationV2, isAdmin } = require('../../auth/authUtils');

//authentication token
router.use(authentication);

router.post('/create', asyncHandler(OrderDetailController.createOrderDetail));
// router.get('/list', asyncHandler(OrderDetailController.searchOrder));
router.delete('/delete/:id', asyncHandler(OrderDetailController.deleteOrderDetail));

//role admin
router.use(isAdmin);


//authentication refreshToken
// router.use(authenticationV2);


module.exports = router;