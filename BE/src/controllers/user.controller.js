'use strict'

const UserService = require("../services/user.service");
const { OK, CREATED, SuccessResponse, UPDATED, DELETED } = require('../core/succes.response');

class UserController {
    getUserById = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get user success!',
            metadata: await UserService.findUserById(req.params.id),
        }).send(res)
    }

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
            metadata: await UserService.updateUser({userId: req.params.id, dataUser: req.body}),
        }).send(res)
    }

    deleteUser = async (req, res, next) => {
        new DELETED({
            message: 'delete user success!',
            metadata: await UserService.deleteUser(req.params.id),
        }).send(res)
    }

    changePassword = async (req, res, next) => {
        new UPDATED({
            message: 'update password success!',
            metadata: await UserService.changePassword({userId: req.body.id, password: req.body.password}),
        }).send(res)
    }

    searchUser = async (req, res, next) => {
        new SuccessResponse({
            message: 'get user list success!',
            metadata: await UserService.searchUser(req.params.search),
        }).send(res)
    }

    createNewUser = async (req, res, next) => {
        new CREATED({
            message: 'create a new user success!',
            metadata: await UserService.createNewUser(req.body),
        }).send(res)
    }
}

module.exports = new UserController