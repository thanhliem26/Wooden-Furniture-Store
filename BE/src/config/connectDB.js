const { Sequelize } = require("sequelize");
require('dotenv').config();

// Option 3: Passing parameters separately (other dialects)
export const sequelize = new Sequelize(process.env.DEV_DB_NAME, process.env.DEV_DB_USERNAME, process.env.DEV_DB_PWD, {
  host: process.env.DEV_DB_HOST,
  dialect: process.env.DEV_DB_DIALECT,
  operatorsAliases: false,
  port: process.env.DEV_DB_PORT,
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  connection,
};
