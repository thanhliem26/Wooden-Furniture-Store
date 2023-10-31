'use strict';

import BaseModel from '../helpers/baseModel';

module.exports = (sequelize, DataTypes) => {
  class TypePackage extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TypePackage.hasMany(models.Contract, {foreignKey: 'package_id', as: 'package_data'})
    }
  }
  TypePackage.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER 
  }, {
    sequelize,
    modelName: 'TypePackage',
  });
  return TypePackage;
};