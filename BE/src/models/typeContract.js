'use strict';

import BaseModel from '../helpers/baseModel';

module.exports = (sequelize, DataTypes) => {
  class TypeContract extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TypeContract.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'TypeContract',
  });
  return TypeContract;
};

/*
Table: Type package				
Name	type	descrption	is Null	default
id	int		no	
name	Char(32)	vd: Cưới, Kỉ yếu, cho bé, thuê đồ,  khác, …	no	
description	Text		yes	
price	int		no	0
created_at	date		no	
updated_at	date		no	
*/