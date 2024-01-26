'use strict';

import BaseModel from '../helpers/baseModel';

module.exports = (sequelize, DataTypes) => {
  class Products extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.Categories, {foreignKey: 'category_id', as: 'category_data'});
    }
  }
  Products.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    stock_quantity: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};
/*

name	char(255)		no
description	string 
price	int	no
stock_quantity	int	no
category_id fk:categories	no		
*/
