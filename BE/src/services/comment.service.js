("use strict");
import { createNewComment } from "../models/repository/comment.repo";
import db, { sequelize } from "../models";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../core/error.response";
import { isNumber } from "../utils";
const { Op, where } = require("sequelize");

class CommentService {
  static UpdateComment = async (payload, user) => {
    if (!payload.id || !payload.content) {
      throw new BadRequestError("id, content is required!");
    }

    const commentUpdate = await db.Comment.findOne({
      where: { id: payload.id },
    });
    if (!commentUpdate) throw new NotFoundError("comment not found!");
    if (user.user_id !== commentUpdate.user_id)
      throw new ForbiddenError(`You don't have a permission!`);

    commentUpdate.content = payload.content;

    return await commentUpdate.save();
  };

  static deleteComment = async (id, user) => {
    if (!id) throw new BadRequestError("id is required!");
    const comment_delete = await db.Comment.findOne({ where: { id } });

    if (!comment_delete)
      throw new NotFoundError("comment delete is not exist!");
    if (user.user_id !== comment_delete.user_id)
      throw new ForbiddenError(`You don't have a permission!`);

    comment_delete.is_deleted = "1";

    return await comment_delete.save();
  };

  static listCommentByProduct = async (query) => {
    const page = +query.page || 1;
    const limit = query.limit ? +query.limit : null;

    if (!query.product_id) {
      throw new BadRequestError("product_id is required!");
    }

    if (!isNumber(query.product_id)) {
      throw new BadRequestError("product_id mus be a number!");
    }

    const queryCountComment = {
      where: {
        product_id: query.product_id,
      },
    };

    const queryListComment = {
      where: {
        product_id: query.product_id,
        parent_id: null,
        is_deleted: "0",
      },
      attributes: [
        "id",
        "product_id",
        "user_id",
        "content",
        "parent_id",
        "createdAt",
        "updatedAt",
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM comments AS c WHERE c.parent_id = Comment.id)"
          ),
          "countChild_low",
        ],
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM comments AS c WHERE c.left > Comment.left AND c.right < Comment.right AND is_deleted = '0')"
          ),
          "countChild_total",
        ],
      ],
      include: [
        {
          model: db.User,
          as: "user_comment",
          attributes: [
            "avatar",
            "avatar_support",
            "id",
            "fullName",
            "role_user",
            "deleteFlg",
          ],
          where: { deleteFlg: "0" },
        },
      ],
      order: [["createdAt", "DESC"]],
      offset: (page - 1) * limit,
    };

    if (limit !== null) {
      queryListComment.limit = limit;
    }

    const [total, comments] = await Promise.all([
      db.Comment.count(queryCountComment),
      db.Comment.findAll(queryListComment),
    ]);

    return { count: total, rows: comments };
  };

  static listCommentChildren = async (query) => {
    if (!query.parent_id) throw new BadRequestError("parent_id is required!");

    const parentComment = await db.Comment.findOne({
      where: { id: query.parent_id },
    });
    if (!parentComment) throw new NotFoundError("Comment not found!");
    const { left, right } = parentComment;

    return await db.Comment.findAll({
      where: {
        is_deleted: "0",
        left: { [Op.gt]: left }, // left > 1
        right: { [Op.lt]: right }, // right < 4
      },
      attributes: [
        "id",
        "product_id",
        "user_id",
        "content",
        "parent_id",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: db.User,
          as: "user_comment",
          attributes: [
            "avatar",
            "avatar_support",
            "id",
            "fullName",
            "role_user",
            "deleteFlg",
          ],
          where: { deleteFlg: "0" },
        },
      ],
      order: [["createdAt", "ASC"]],
    });
  };

  static createComment = async (data, user) => {
    if (user.user_id !== +data.user_id) {
      throw new BadRequestError(`You don't have a permission!`);
    }
    return await createNewComment(data);
  };
}

module.exports = CommentService;
