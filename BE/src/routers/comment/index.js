'use strict'

const express = require('express');
const CommentController = require('../../controllers/comment.controller');
const router = express.Router();
const  asyncHandler = require('../../helpers/asyncHandler');
const { authentication, authenticationV2, isAdmin } = require('../../auth/authUtils');

//authentication token
router.use(authentication);


//product comment
router.post('/create', asyncHandler(CommentController.createNewComment));
router.get('/list', asyncHandler(CommentController.getListComment));
router.get('/list-children', asyncHandler(CommentController.getListChildrenComment));
router.patch('/update', asyncHandler(CommentController.updateComment));
router.delete('/delete/:id', asyncHandler(CommentController.deleteComment));

//news comment
router.post('/create-news', asyncHandler(CommentController.createNewsComment));
router.get('/list-news', asyncHandler(CommentController.getListNewsComment));
router.get('/list-children-news', asyncHandler(CommentController.getListChildrenNewsComment));


//role admin
router.use(isAdmin);



//authentication refreshToken
// router.use(authenticationV2);


module.exports = router;