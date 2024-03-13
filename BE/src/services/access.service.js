"use strict";
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const tokenService = require("./token.service");
const { createTokenPair, verifyJWT } = require("../auth/authUtils");
const {
  BadRequestError,
  ConflictRequestError,
  AuthFailureError,
  ForbiddenError,
} = require("../core/error.response");
import { findById } from "../models/repository/user.repo";
import db from "../models";
import { validateUser, createNewUser } from "../models/repository/user.repo";
import { deleteFIleUpload, getInfoData } from "../utils";
import { deleteFileS3, uploadFileS3 } from "../utils/aws";
const fs = require("fs").promises;

class AccessService {
  static handleRefreshToken = async (refreshToken) => {
    const foundToken = await tokenService.findByRefreshTokenUsed(refreshToken);
    if (foundToken) {
      //decode user nào đang sử dụng lại refresh token
      const { user_id, email } = await verifyJWT(
        refreshToken,
        foundToken.privateKey
      );
      await tokenService.deleteKeyById(user_id);

      throw new ForbiddenError("Something wrong happened !!! Pls re-login");
    }

    const holderToken = await tokenService.findByRefreshTokenByUser(
      refreshToken
    );

    if (!holderToken) throw new AuthFailureError("User not registered");
    const { user_id, email } = await verifyJWT(
      refreshToken,
      holderToken.privateKey
    );

    const foundUser = await findById(user_id);
    if (!foundUser) throw new AuthFailureError("Shop not registered");

    const tokens = await createTokenPair(
      { user_id: foundUser.id, email, role_user: foundUser.role_user },
      holderToken.publicKey,
      holderToken.privateKey
    );
    //update refreshToken and refreshToken used
    const tokenUsed = JSON.parse(holderToken.refreshTokenUsed);

    holderToken.refreshToken = tokens.refreshToken;
    holderToken.refreshTokenUsed = JSON.stringify([...tokenUsed, refreshToken]);
    holderToken.save();

    return {
      user: { id: user_id, email },
      tokens,
    };
  };

  static logout = async (keyStore) => {
    const delKey = await tokenService.removeKeyById(keyStore.id);
    return delKey;
  };

  static login = async ({ email, password, refreshToken = null }) => {
    //check exits email
    const foundUser = await db.User.findOne({ where: { email }, raw: true });
    if (!foundUser || foundUser.deleteFlg !== 0)
      throw new BadRequestError("User not registered");

    // //check match password
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) throw new AuthFailureError("Password not match to email!");

    // //create privateKey, public key
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    // // generator tokens
    const tokens = await createTokenPair(
      { user_id: foundUser.id, email, role_user: foundUser.role_user },
      publicKey,
      privateKey
    );

    await tokenService.createKeyToken({
      userId: foundUser.id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });

    return {
      user: getInfoData({
        field: ["id", "fullName", "email"],
        object: foundUser,
      }),
      tokens,
    };
  };

  static signUp = async (data) => {
    //step1: check email exists
    const validateField = await validateUser({ ...data });
    if (!validateField.status) {
      throw new Error(validateField.message);
    }

    const { email, password } = data;
    //step2: check email exists
    const holderUser = await db.User.findOne({ raw: true, where: { email } });

    if (holderUser) {
      throw new BadRequestError("Error: Email already registered");
    }

    //step3: encode password
    const passwordHash = await bcrypt.hash(password, 10);

    //step4: create user

    const newUser = await createNewUser({ ...data, password: passwordHash });

    if (newUser) {
      //step5: response data
      return {
        code: 201,
        metadata: {
          user: getInfoData({
            field: [
              "id",
              "fullName",
              "email",
              "phoneNumber",
              "address",
              "dateOfBirth",
              "sex",
            ],
            object: newUser,
          }),
        },
      };
    }

    return {
      code: 200,
      metadata: null,
    };
  };

  static uploadFileServiceS3 = async (file, data) => {
    if (!file || !data.nameFile) {
      throw new BadRequestError("File and nameFile is required!");
    }

    const pathImage = file.path;
    const nameImage = data.nameFile;

    try {
      const fileData = await fs.readFile(pathImage);
      const fileS3 = await uploadFileS3(fileData, nameImage);

      //delete file in folder upload
      deleteFIleUpload(pathImage);

      return fileS3;
    } catch (err) {
      throw err;
    }
  };

  static deleteFileServiceS3 = async (key) => {
    if (!key) {
      throw new BadRequestError("key is required!");
    }

    return await deleteFileS3(key);
  };
}

module.exports = AccessService;
