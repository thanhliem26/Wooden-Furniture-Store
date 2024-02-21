("use strict");
import db from "../models";
import {
    createNewStatic,
} from "../models/repository/static.repo";
import {
  getTopProductById
} from '../models/repository/product.repo';
import { BadRequestError } from "../core/error.response";
const { Op } = require("sequelize");


class CategoryService {
  static setStatic = async (data) => {
    return await createNewStatic(data);
  };

  static getStatic = async ({type}) => {
    const optionQuery = {
      where: {},
      raw: true,
      attributes: { exclude: ["createdAt", 'updatedAt'] },
    }

    if(type) {
      optionQuery.where.type =  type;
    }

    return await db.Static.findAll(optionQuery);
  }

  static getStaticPage = async (payload) => {
    if(!payload.type) {
      throw new BadRequestError('Type is required!')
    }

    const staticPg = await CategoryService.getStatic(payload).then(async (response) => {
      const [ static_page ] = response;
      const { productShow } = static_page;

      const ids = productShow ? JSON.parse(productShow) : [];
      const limitProduct = payload.limitProduct ? payload.limitProduct : 8;
  
      const productEnabled = await getTopProductById({ids: ids, limitProduct: limitProduct})
      return {
        ...static_page,
        productShow: productEnabled,
      };
    });

    return staticPg;
  }
}

module.exports = CategoryService;
