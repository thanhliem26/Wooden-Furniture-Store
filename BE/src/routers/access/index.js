'use strict'

const express = require('express');
const AccessController = require('../../controllers/access.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, authenticationV2 } = require('../../auth/authUtils');

//sign up, login
router.post('/user/signup', asyncHandler(AccessController.signUp)); 
router.post('/user/login', asyncHandler(AccessController.login)); 

//authentication token
// router.use(authentication);

// //authentication refreshToken
// router.use(authenticationV2);

router.post('/user/logout', authenticationV2, asyncHandler(AccessController.logout));
router.post('/user/handleRefreshToken', authenticationV2, asyncHandler(AccessController.handleRefreshToken));

module.exports = router;