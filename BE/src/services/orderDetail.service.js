("use strict");
import { BadRequestError, ForbiddenError } from "../core/error.response";
import db, { sequelize } from "../models";
import { createNewOrderDetail } from "../models/repository/orderDetail.repo";
const { Op, where } = require("sequelize");

class OrderService {
  static deleteOrderDetail = async (orderId) => {
    return await db.OrderDetail.destroy({
      where: {
        id: orderId,
      },
    });
  };

  static getOrderDetailById = async (query) => {
    if (!query.user_id || !query.id) {
      throw new BadRequestError("user_id and id is not empty!");
    }

    const order = await db.Orders.findByPk(query.id);
    if (+order.user_id !== +query.user_id) {
      throw new ForbiddenError("User don't have a permission!");
    }

    const orderDetail = await db.OrderDetail.findAll({
      where: {
        order_id: query.id,
      },
      include: [{ model: db.Products, as: "product_data"}]
    });

    return orderDetail;
  };

  static createOrderDetail = async (data) => {
    return await createNewOrderDetail(data);
  };
}

module.exports = OrderService;
