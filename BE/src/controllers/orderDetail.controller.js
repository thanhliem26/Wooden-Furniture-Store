'use strict'

const OrderDetailService = require("../services/orderDetail.service");
const { OK, CREATED, SuccessResponse, UPDATED, DELETED } = require('../core/succes.response');

class OrderController {
    deleteOrderDetail = async (req, res, next) => {
        new DELETED({
            message: 'delete order detail success!',
            metadata: await OrderDetailService.deleteOrderDetail(req.params.id),
        }).send(res)
    }

    // searchOrder = async (req, res, next) => {
    //     new SuccessResponse({
    //         message: 'get order list success!',
    //         metadata: await OrderDetailService.searchOrder(req.query),
    //         options: {
    //             ...req.query
    //         }
    //     }).send(res)
    // }

    createOrderDetail = async (req, res, next) => {
        new CREATED({
            message: 'create a new order detail success!',
            metadata: await OrderDetailService.createOrderDetail(req.body),
        }).send(res)
    }

}

module.exports = new OrderController