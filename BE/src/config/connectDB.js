const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
export const sequelize = new Sequelize("WoodenFurnitureStore", "root", "Thanhliem2612.", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
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
