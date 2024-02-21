("use strict");
import {
  createNewProduct,
  updateProduct,
} from "../models/repository/product.repo";
import db, { sequelize } from "../models";
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
    const limit = query.limit ? +query.limit : null;
    const valueSearch = query.name;

    const queryOptions = {
      where: {
        [Op.or]: [{ name: { [Op.like]: `%${valueSearch}%` } }],
      },
      offset: (page - 1) * limit,
    }

    if (limit !== null) {
      queryOptions.limit = limit;
    }

    return await db.Products.findAndCountAll(queryOptions);
  };

  static createProduct = async (data) => {
    return await createNewProduct(data);
  };

  static getTopProduct = async ({ top = 3 }) => {
    //get all product has top category_id
    const categories = await db.Products.findAll({
      attributes: [
        "category_id",
        [sequelize.fn("COUNT", sequelize.col("*")), "total"],
        [sequelize.literal("category_data.name"), "category_name"],
      ],
      include: [{ model: db.Categories, as: "category_data", attributes: [] }],
      raw: true,
      group: ["category_id"],
      order: [[sequelize.literal("total"), "DESC"]],
      limit: top,
    }).then(async (category) => {
      const idTop = category.map((category) => category.category_id);
      const productInTop = await db.Products.findAll({
        where: {
          category_id: {
            [Op.in]: idTop,
          },
        },
        raw: true,
      });
      
      const initialValue = Array.from(new Array(top)).reduce((current, next, index) => {
        const productTop = category[index] ? {...category[index], data: []} : {category_id: null, total: 0, category_name: null, data: []};
        current[`top${index + 1}`] = productTop;

        return current;
      }, {});

      const orderProduct = productInTop.reduce((current, next) => {
        for (const property in initialValue) {
          if (next.category_id === initialValue[property].category_id) {
            current[property].data.push(next);

            return current;
          }
        }
        return current;
      }, initialValue);

      return orderProduct;
    });

    return categories;
  };
}

module.exports = CategoryService;
