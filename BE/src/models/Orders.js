'use strict';

import BaseModel from '../helpers/baseModel';

module.exports = (sequelize, DataTypes) => {
  class Orders extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.hasOne(models.OrderDetail, { foreignKey: "order_id", as: "order_detail" })
      Orders.belongsTo(models.User, { foreignKey: "user_id", as: "user_data" })
    }
  }
  Orders.init({
    user_id: DataTypes.INTEGER,
    order_date: DataTypes.DATE,
    total_amount: DataTypes.INTEGER,
    order_status: DataTypes.ENUM("pending", "confirmed", "shipped", "cancelled", "delivered"),
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};
/*

user_id	int	fk: user	
order_date	date ngày_submit_order no
total_amount int tổng số tiền
order_status enum
    - pending: đang trong trạng thái chờ (default)
    - confirmed: đã xác nhận bên phía user 
    - shipped: đã bàn giao cho ship
    - cancelled: đã xóa bởi user (hành động sẽ không được sử dụng nếu đang trong trạng thái shipped)
    - dellivered: xác nhận giao hàng thành công
*/
