import db from "../index";

const validateUser = async (payload) => {
  const newUser = await db.User.build({
    ...payload,
  });

  return await newUser.validateCreateUser();
};

const createNewUser = async (payload) => {
  return await db.User.create({
    ...payload,
  });
};

module.exports = {
  validateUser,
  createNewUser
};
