'use strict'

const express = require('express');
const AccessController = require('../../controllers/access.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, authenticationV2 } = require('../../auth/authUtils');

//sign up, login
router.post('/signup', asyncHandler(AccessController.signUp)); 
router.post('/login', asyncHandler(AccessController.login)); 

//authentication token
// router.use(authentication);

// //authentication refreshToken
router.use(authenticationV2);

router.post('/logout', asyncHandler(AccessController.logout));
router.post('/handleRefreshToken', asyncHandler(AccessController.handleRefreshToken));

module.exports = router;