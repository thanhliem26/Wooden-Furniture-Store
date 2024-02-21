'use strict'

const express = require('express');
const StaticController = require('../../controllers/static.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, authenticationV2, isAdmin } = require('../../auth/authUtils');

//authentication token
router.use(authentication);

router.get('/static-page', asyncHandler(StaticController.getStaticPage));

//role admin
router.use(isAdmin);

router.post('/set-static', asyncHandler(StaticController.setStatic));
router.get('/get-static', asyncHandler(StaticController.getStatic));

//authentication refreshToken
// router.use(authenticationV2);


module.exports = router;