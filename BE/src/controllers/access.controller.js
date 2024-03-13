'use strict'

const AccessService = require("../services/access.service");
const { OK, CREATED, SuccessResponse } = require('../core/succes.response');
class AccessController {
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

    uploadFileS3 = async (req, res, next) => {
        new CREATED({
            message: 'upload file success!',
            metadata: await AccessService.uploadFileServiceS3(req.file, req.body),
        }).send(res)
    }

    deleteFileS3 = async (req, res, next) => {
        new CREATED({
            message: 'delete file success!',
            metadata: await AccessService.deleteFileServiceS3(req.params.key),
        }).send(res)
    }
}

module.exports = new AccessController