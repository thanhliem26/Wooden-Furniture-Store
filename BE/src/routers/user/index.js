'use strict'

const express = require('express');
const AccessController = require('../../controllers/access.controller');
const UserController = require('../../controllers/user.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, authenticationV2, isAdmin } = require('../../auth/authUtils');

//authentication token
router.use(authentication);

router.get('/me', asyncHandler(UserController.userInfo));
router.get('/menu',  asyncHandler(UserController.menu));
router.put('/update', asyncHandler(UserController.updateUser));

router.use(isAdmin);
router.get('/list', asyncHandler(UserController.getAllUser));
router.put('/delete/:id', asyncHandler(UserController.deleteUser));


//authentication refreshToken
// router.use(authenticationV2);


module.exports = router;