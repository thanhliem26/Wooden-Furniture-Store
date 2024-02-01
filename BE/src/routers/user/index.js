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
router.put('/update/:id', asyncHandler(UserController.updateUser));
router.put('/changePassword', asyncHandler(UserController.changePassword));

//role admin
router.use(isAdmin);

router.post('/create-user', asyncHandler(UserController.createNewUser));
router.get('/list', asyncHandler(UserController.getAllUser));
router.get('/list/:search', asyncHandler(UserController.searchUser));
router.get('/:id', asyncHandler(UserController.getUserById));
router.put('/delete/:id', asyncHandler(UserController.deleteUser));



//authentication refreshToken
// router.use(authenticationV2);


module.exports = router;