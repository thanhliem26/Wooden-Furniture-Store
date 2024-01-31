("use strict");
import { findById } from "../models/repository/user.repo";
import db from "../models";
import { menu } from "../constants";
import { getInfoData, removeElement } from "../utils";
const bcrypt = require("bcrypt");

class UserService {
  static findUserById = async (userId) => {
    const userInfo = await findById(userId);

    return removeElement({
      object: userInfo,
      field: ["createdAt", "updatedAt", "password", "createdAt"],
    });
  };

  static handleGetUserInfo = async (userId) => {
    const userInfo = await findById(userId);

    return removeElement({
      object: userInfo,
      field: ["createdAt", "updatedAt", "password", "createdAt"],
    });
  };

  static handleGetMenu = async (roleUser) => {
    return menu.reduce((current, next) => {
      if (next.role.includes(Number(roleUser))) {
        current.push(
          getInfoData({ field: ["id", "href", "icon", "label"], object: next })
        );
      }

      return current;
    }, []);
  };

  static getAllUser = async () => {
    return await db.User.findAll({ where: {deleteFlg: 0}, attributes: { exclude: ["password"] } });
  };

  static updateUser = async ({ userId, dataUser }) => {
    return await db.User.update(
      { ...dataUser },
      {
        where: {
          id: userId,
        },
      }
    );
  };

  static deleteUser = async (userId) => {
    return await db.User.update(
      { deleteFlg: 1 },
      {
        where: {
          id: userId,
        },
      }
    );
  };

  static changePassword = async ({userId, password}) => {
    //create password hash
    const passwordHash = await bcrypt.hash(password, 10);

    return await db.User.update(
      { password: passwordHash },
      {
        where: {
          id: userId,
        },
      }
    );
  }
}

module.exports = UserService;
