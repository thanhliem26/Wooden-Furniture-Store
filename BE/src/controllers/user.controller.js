'use strict'

const UserService = require("../services/user.service");
const { OK, CREATED, SuccessResponse, UPDATED, DELETED } = require('../core/succes.response');

class UserController {
    getAllUser = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get user list success!',
            metadata: await UserService.getAllUser(),
        }).send(res)
    }

    userInfo = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get user info success!',
            metadata: await UserService.handleGetUserInfo(req.user.user_id),
        }).send(res)
    }

    menu = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get menu success!',
            metadata: await UserService.handleGetMenu(req.user.role_user),
        }).send(res)
    }

    updateUser = async (req, res, next) => {
        new UPDATED({
            message: 'update user success!',
            metadata: await UserService.updateUser({userId: req.body.id, dataUser: req.body}),
        }).send(res)
    }

    deleteUser = async (req, res, next) => {
        new DELETED({
            message: 'delete user success!',
            metadata: await UserService.deleteUser(req.params.id),
        }).send(res)
    }
}

module.exports = new UserController