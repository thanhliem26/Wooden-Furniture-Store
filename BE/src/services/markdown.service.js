("use strict");
import {
    createNewMarkdown,
} from "../models/repository/markdown.repo";
import db, { sequelize } from "../models";
import { BadRequestError } from "../core/error.response";
const { Op } = require("sequelize");

class MarkdownService {
//   static UpdateProduct = async (payload) => {
//     return await updateProduct(payload);
//   };

//   static deleteProduct = async (ProductId) => {
//     return await db.Products.destroy({
//       where: {
//         id: ProductId,
//       },
//     });
//   };

//   static searchProduct = async (query) => {
//     const page = +query.page || 1;
//     const limit = query.limit ? +query.limit : null;
//     const valueSearch = query.name;

//     const queryWhere = {
//       [Op.or]: [{ name: { [Op.like]: `%${valueSearch}%` } }],
//     };

//     if (query.category_id) {
//       queryWhere.category_id = query.category_id;
//     }

//     if (query.minPrice && query.maxPrice) {
//       queryWhere.price = {
//         [Op.between]: [query.minPrice, query.maxPrice],
//       };
//     }

//     const queryOptions = {
//       where: {
//         ...queryWhere,
//       },
//       attributes: [
//         "category_id",
//         "createdAt",
//         "description",
//         "id",
//         "images",
//         "name",
//         "price",
//         "stock_quantity",
//         "updatedAt",
//         [sequelize.literal("category_data.name"), "category_name"],
//       ],
//       offset: (page - 1) * limit,
//       include: [{ model: db.Categories, as: "category_data", attributes: [] }],
//     };

//     if (limit !== null) {
//       queryOptions.limit = limit;
//     }

//     return await db.Products.findAndCountAll(queryOptions);
//   };

  static createMarkdown = async (data) => {
    return await createNewMarkdown(data);
  };

}

module.exports = MarkdownService;
