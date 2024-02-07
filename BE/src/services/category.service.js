("use strict");
import {
  createNewCategory,
  updateCategory,
} from "../models/repository/category.repo";
import db from "../models";
import { menu } from "../constants";
import { getInfoData, removeElement } from "../utils";
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
import { validateUser, createNewUser } from "../models/repository/user.repo";
import { BadRequestError } from "../core/error.response";

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
    //step1: check email exists
    return await createNewCategory(data);
  };
}

module.exports = CategoryService;
