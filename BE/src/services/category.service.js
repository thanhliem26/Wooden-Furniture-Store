("use strict");
import {
  createNewCategory,
  updateCategory,
} from "../models/repository/category.repo";
import db from "../models";
const { Op } = require("sequelize");

class CategoryService {
  static UpdateCategory = async (payload) => {
    return await updateCategory(payload);
  };

  static deleteCategory = async (CategoryId) => {
    return await db.Categories.destroy({
      where: {
        id: CategoryId,
      },
    });
  };

  static searchCategory = async (query) => {
    const page = +query.page || 1;
    const limit = +query.limit || 10;
    const valueSearch = query.name;

    return await db.Categories.findAndCountAll({
      where: {
        [Op.or]: [{ name: { [Op.like]: `%${valueSearch}%` } }],
      },
      limit: limit,
      offset: (page - 1) * limit,
    });
  };

  static createCategory = async (data) => {
    return await createNewCategory(data);
  };
}

module.exports = CategoryService;
