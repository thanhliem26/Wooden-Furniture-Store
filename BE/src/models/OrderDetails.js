'use strict';

import BaseModel from '../helpers/baseModel';

module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetail.belongsTo(models.Orders, { foreignKey: "order_id", as: "order_detail" })
    }
  }
  OrderDetail.init({
    order_id: DataTypes.INTEGER,
    product_list_id: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    unit_list_price: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};
/*

order_id	int		no
product_id	string danh sách id sản phẩm no
quantity int số lượng sản phẩm có trong đơn hàng
unit_list_price string số tiền cho từng sản phẩm
*/
