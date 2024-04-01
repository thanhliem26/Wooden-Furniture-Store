("use strict");
import { createNewEvaluate } from "../models/repository/evaluate.repo";
import db, { sequelize } from "../models";
import { BadRequestError } from "../core/error.response";
const { Op } = require("sequelize");

class CategoryService {
  static getListEvaluate = async (query) => {
    if (!query?.product_id) {
      throw new BadRequestError("product_id is required!");
    }

    const page = +query.page || 1;
    const limit = query.limit ? +query.limit : null;

    const queryOptions = {
      where: {
        product_id: query.product_id,
      },
      include: [
        {
          model: db.User,
          as: "user_evaluate",
          attributes: ["avatar", "id", "fullName", "role_user", "deleteFlg"],
          where: { deleteFlg: "0" },
        },
      ],
      offset: (page - 1) * limit,
    };

    if (limit !== null) {
      queryOptions.limit = limit;
    }

    const countStar = await db.Evaluate.findAll({
      where: {
        product_id: query.product_id,
      },
      attributes: [
        [
          sequelize.fn(
            "COUNT",
            sequelize.literal('CASE WHEN star = "1" THEN 1 END')
          ),
          "star_1_count",
        ],
        [
          sequelize.fn(
            "COUNT",
            sequelize.literal('CASE WHEN star = "2" THEN 1 END')
          ),
          "star_2_count",
        ],
        [
          sequelize.fn(
            "COUNT",
            sequelize.literal('CASE WHEN star = "3" THEN 1 END')
          ),
          "star_3_count",
        ],
        [
          sequelize.fn(
            "COUNT",
            sequelize.literal('CASE WHEN star = "4" THEN 1 END')
          ),
          "star_4_count",
        ],
        [
          sequelize.fn(
            "COUNT",
            sequelize.literal('CASE WHEN star = "5" THEN 1 END')
          ),
          "star_5_count",
        ],
      ],
      raw: true,
      group: ["star"],
    }).then((response) => {
      return response.reduce((acc, curr) => {
        acc[0] = acc[0]?.name ? {name: '1 stars', count: acc[0].count + curr.star_1_count, value: 1} : {name: '1 stars', count: curr.star_1_count, value: 1};
        acc[1] = acc[1]?.name ? {name: '2 stars', count: acc[1].count + curr.star_2_count, value: 2} : {name: '2 stars', count: curr.star_2_count, value: 2};
        acc[2] = acc[2]?.name ? {name: '3 stars', count: acc[2].count + curr.star_3_count, value: 3} : {name: '3 stars', count: curr.star_3_count, value: 3};
        acc[3] = acc[3]?.name ? {name: '4 stars', count: acc[3].count + curr.star_4_count, value: 4} : {name: '4 stars', count: curr.star_4_count, value: 4};
        acc[4] = acc[4]?.name ? {name: '5 stars', count: acc[4].count + curr.star_5_count, value: 5} : {name: '5 stars', count: curr.star_5_count, value: 5};
        
        return acc;
      }, []);
    });

    const countReview = await db.Evaluate.count({
      where: {
        product_id: query.product_id,
        evaluate: {
          [Op.not]: null,
          [Op.not]: "",
        },
      },
      raw: true,
    });

    const listEvaluate = await db.Evaluate.findAndCountAll(queryOptions);

    return {
      count: listEvaluate.count,
      rows: listEvaluate.rows,
      countReview: countReview,
      countStar: countStar,
    }
  };

  static getEvaluate = async (id) => {
    if (!id) {
      throw new BadRequestError("id is required!");
    }

    return await db.Evaluate.findByPk(id, {
      include: [
        {
          model: db.User,
          as: "user_evaluate",
          attributes: ["avatar", "id", "fullName", "role_user", "deleteFlg"],
          where: { deleteFlg: "0" },
        },
      ],
    });
  };

  static createEvaluate = async (data) => {
    return await createNewEvaluate(data);
  };
}

module.exports = CategoryService;
