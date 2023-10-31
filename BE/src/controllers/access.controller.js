'use strict'

const AccessService = require("../services/access.service");
const { OK, CREATED, SuccessResponse } = require('../core/succes.response');
class AccessController {
    userInfo = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get user info success!',
            metadata: await AccessService.handleGetUserInfo(req.user.user_id),
        }).send(res)
    }

    menu = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get menu success!',
            metadata: await AccessService.handleGetMenu(req.user.role_user),
        }).send(res)
    }

    handleRefreshToken = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get tokens success!',
            metadata: await AccessService.handleRefreshToken(req.refreshToken),
        }).send(res)
    }

    logout = async (req, res, next) => {
        new SuccessResponse({
            message: 'logout success',
            metadata: await AccessService.logout(req.keyStore),
        }).send(res)
    }

    login = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.login(req.body),
        }).send(res)
    }

    signUp = async (req, res, next) => {
        new CREATED({
            message: 'Registered OK!',
            metadata: await AccessService.signUp(req.body),
            options: {
                limit: 10,
            }
        }).send(res)
    }
}

module.exports = new AccessController