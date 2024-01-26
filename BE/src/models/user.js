"use strict";

import BaseModel from "../helpers/baseModel";
import Joi from "joi";

module.exports = (sequelize, DataTypes) => {
  class User extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Orders, { foreignKey: "user_id", as: "user_data" });
    }

    validateCreateUser = async () => {
      const schema = Joi.object({
        fullName: Joi.string().required(),
        password: Joi.string()
          .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};':\",.<>?]{3,30}$"))
          .required(),
        email: Joi.string()
          .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
          })
          .required(),
      })
        .unknown(true)

      try {
        const value = await schema.validateAsync({ ...this.dataValues });
        if(value) return {status: true};
      } catch (error) {
        return {
          status: false,
          message: error.details?.[0]?.message,
        };
      }
    };
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING(25),
      address: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
      sex: DataTypes.ENUM("1", "2", "3"),
      role_user: DataTypes.ENUM("1", "2", "3"),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

/*
Name	type	descrption	is Null	default
id	int		no	
fullName	char(255)		no	
password	char(32)		no	
email	char(255)		no	
phoneNumber	int		no	
address	char(255)		yes	
dateOfBirth	date		yes	
role_user	tinyint(1, 2, 3)	1: Admin, 2: Staf, 3: Customer	no	3
work_id	int			
created_at	date		no	
update_at	date		no	

*/
