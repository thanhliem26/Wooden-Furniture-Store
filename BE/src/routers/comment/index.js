'use strict'

const express = require('express');
const CommentController = require('../../controllers/comment.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, authenticationV2, isAdmin } = require('../../auth/authUtils');

//authentication token
router.use(authentication);

router.post('/create', asyncHandler(CommentController.createNewComment));
router.get('/list', asyncHandler(CommentController.getListComment));
router.get('/list-children', asyncHandler(CommentController.getListChildrenComment));
router.patch('/update', asyncHandler(CommentController.updateComment));
router.delete('/delete/:id', asyncHandler(CommentController.deleteComment));


//role admin
router.use(isAdmin);



//authentication refreshToken
// router.use(authenticationV2);


module.exports = router;