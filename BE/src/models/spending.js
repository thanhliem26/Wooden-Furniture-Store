'use strict';

import BaseModel from '../helpers/baseModel';

module.exports = (sequelize, DataTypes) => {
  class Spending extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spending.belongsTo(models.Catalog, {foreignKey: 'catalog_id', as: 'catalog_data'});
      Spending.belongsTo(models.User, {foreignKey: 'user_id', as: 'user_info_spending'})
    }
  }
  Spending.init({
    date_spending: DataTypes.DATE,
    description: DataTypes.TEXT,
    catalog_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    payment_method: DataTypes.STRING,
    bank_use:  DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Spending',
  });
  return Spending;
};

/*
Table: Spending				
Name	type	descrption	is Null	default
id	int		no	
date_spending	date		no	
description	Text		yes	
catalog_id	int	fk: catalog	no	
price	int		no	0
user_id	int	người chi	no	
payment_method	tinyint	1: Tiền măt, 2: Ngân hàng	no	
bank_use	int	bank sử dụng khi payment_method là 2	yes	
*/