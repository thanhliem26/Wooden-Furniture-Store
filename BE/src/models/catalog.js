'use strict';

import BaseModel from '../helpers/baseModel';

module.exports = (sequelize, DataTypes) => {
  class Catalog extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Catalog.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Catalog',
  });
  return Catalog;
};

/*
Table: Catalog				
Name	type	descrption	is Null	default
id	int		no	
name	Char(32)	vd: ăn uống, sinh hoạt phí, cước xe, in ảnh, khác,…	no	
description	Text		yes	
created_at	date		no	
updated_at	date		no	
*/
