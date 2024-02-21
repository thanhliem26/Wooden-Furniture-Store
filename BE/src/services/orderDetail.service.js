("use strict");
import db, { sequelize } from "../models";
import { createNewOrderDetail } from '../models/repository/orderDetail.repo';
const { Op } = require("sequelize");

class OrderService {

  static deleteOrderDetail = async (orderId) => {
    return await db.OrderDetail.destroy({
      where: {
        id: orderId,
      },
    });
  };

//   static searchOrder = async (query) => {
//     const page = +query.page || 1;
//     const limit = query.limit ? +query.limit : null;
//     const filterSearch = {};
    
//     if(query.order_status) {
//       filterSearch.order_status = query.order_status
//     }

//     if(query.user_id) {
//       filterSearch.user_id = query.user_id
//     }

//     const queryOptions = {
//       where: {
//         ...filterSearch
//       },
//       offset: (page - 1) * limit,
//     }
  

//     if (limit !== null) {
//       queryOptions.limit = limit;
//     }

//     return await db.Orders.findAndCountAll(queryOptions);
//   };

  static createOrderDetail = async (data) => {
    return await createNewOrderDetail(data)
  };
}

module.exports = OrderService;
