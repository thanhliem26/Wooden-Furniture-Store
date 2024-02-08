("use strict");
import {
    createNewProduct,
    updateProduct,
} from "../models/repository/product.repo";
import db from "../models";
const { Op } = require("sequelize");

class CategoryService {
  static UpdateProduct = async (payload) => {
    return await updateProduct(payload);
  };

  static deleteProduct = async (ProductId) => {
    return await db.Products.destroy({
      where: {
        id: ProductId,
      },
    });
  };

  static searchProduct = async (query) => {
    const page = +query.page || 1;
    const limit = +query.limit || 10;
    const valueSearch = query.name;

    return await db.Products.findAndCountAll({
      where: {
        [Op.or]: [{ name: { [Op.like]: `%${valueSearch}%` } }],
      },
      limit: limit,
      offset: (page - 1) * limit,
    });
  };

  static createProduct = async (data) => {
    return await createNewProduct(data);
  };
}

module.exports = CategoryService;
