'use strict'

const express = require('express');
const AccessController = require('../../controllers/access.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, authenticationV2 } = require('../../auth/authUtils');

//authentication token
// router.use(authentication);
router.get('/user/me', authentication, asyncHandler(AccessController.userInfo))
router.get('/user/menu', authentication,  asyncHandler(AccessController.menu));

//authentication refreshToken
// router.use(authenticationV2);


module.exports = router;