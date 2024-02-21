import { BadRequestError } from "../../core/error.response";
const { Op } = require("sequelize");
import db, { sequelize } from "../index";

const validateOrder = async (payload) => {
  const newOrder = await db.Orders.build({
    ...payload,
  });

 return await newOrder.validateOrder();
};

const createNewOrder = async (payload) => {
  const order_isValid = await validateOrder(payload);

  if (order_isValid.status === false) {
    throw new BadRequestError(order_isValid.message);
  }

  //add quantity
  const { user_id } = payload;

  const filter = { order_status: "pending", user_id };
  const update = { ...payload };
  const options = { upsert: true };

  return await db.Orders.findOneAndUpdate({
    filter: filter,
    values: update,
    options: options,
  });
};

const updateOrder = async (payload) => {
  if (!payload.id) {
    throw new BadRequestError("Order id is not empty!");
  }

  //add quantity
  const order = await db.Orders.findByPk(payload.id);
  if(!order) {
    throw new BadRequestError("Order not exits!");
  }

  for (let property in payload) {
    order[property] = payload[property];
  }

  const order_isValid = await order.validateOrder();
  if (order_isValid.status === false) {
    throw new BadRequestError(order_isValid.message);
  }

  return await order.save();
};

module.exports = {
  createNewOrder,
  updateOrder,
};
