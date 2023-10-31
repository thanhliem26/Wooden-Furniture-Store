'use strict';

import BaseModel from '../helpers/baseModel';

module.exports = (sequelize, DataTypes) => {
  class Contract extends BaseModel {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contract.belongsTo(models.User, {foreignKey: 'user_id', as: 'user_info'});
      Contract.belongsTo(models.TypePackage, {foreignKey: 'package_id', as: 'package_data'})
    }
  }
  Contract.init({
    numberContact: DataTypes.STRING,
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    package_id: DataTypes.INTEGER,
    date_get_Image: DataTypes.DATE,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    date_deadLine: DataTypes.DATE,
    date_delivery: DataTypes.DATE,
    paid: DataTypes.INTEGER,
    arise: DataTypes.INTEGER,
    link_images: DataTypes.TEXT,
    note_staff: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Contract',
  });
  return Contract;
};
/*

name	char(255)		no
user_id	int	fk: user	no
package_id	int	fk: type_package	no
price_package	int		
date_getImage	date		
start_date	date	ngày bắt đầu chụp ảnh	
end_date	date	ngày cuối chụp ảnh	
date_deadline	date	ngày hẹn chót giao ảnh	
date_delivery	date	ngày thực giao ảnh	
paid	int	đã thanh toán được bao nhiêu	
arise	int	tiền phát sinh 	
link_images	char(255)	link ảnh chụp	
note_staft	text	ghi chú cho nhân viên	
created_at	date		no
updated_at	date		no
*/
