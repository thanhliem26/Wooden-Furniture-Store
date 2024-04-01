("use strict");
import { BadRequestError, ForbiddenError } from "../core/error.response";
import db, { sequelize } from "../models";
import { createNewOrderDetail } from "../models/repository/orderDetail.repo";
import { ORDER_STATUS } from "./../constants/index";
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
      include: [{ model: db.Products, as: "product_data" }],
    });

    return orderDetail;
  };

  static createOrderDetail = async (data) => {
    return await createNewOrderDetail(data);
  };

  static getOrderDetailExcludePending = async (query, user_id) => {
    const offset = +query.page || 1;
    const limit = query?.limit ? +query.limit : null;

    let querySql = `SELECT 
      O.*, 
      Od.*, 
      JSON_OBJECT(
        'id', P.id, 
        'name', P.name, 
        'description', P.description,
        'price', P.price,
        'images', P.images,
        'updatedAt', P.updatedAt
      ) AS product_data
      FROM Orders AS O 
      INNER JOIN Order_detail AS Od ON O.id = Od.order_id
      INNER JOIN Products AS P ON Od.productId = P.id
      WHERE O.order_status <> '${ORDER_STATUS.PENDING}'
      AND O.user_id = ${user_id}`;

    if (limit) {
      querySql += ` LIMIT ${limit}`;
    }

    if (offset && limit) {
      querySql += ` OFFSET ${offset}`;
    }

    const listOrderDetail = await sequelize
      .query(querySql, { type: sequelize.QueryTypes.SELECT })
      .then((results) => {
        return results;
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    return listOrderDetail;
  };

  static updateOrderDetail = async (data) => {
    if(!data?.id || !data.evaluate_id) {
      throw new BadRequestError('id and evaluate_id  is required!');
    }

    return await db.OrderDetail.update({evaluate_id: data.evaluate_id},{
      where: {
        id: data.id,
      },
    });
  };
}

module.exports = OrderService;
