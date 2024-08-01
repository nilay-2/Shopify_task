const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("testdb", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: "3306",
  // logging: false,
});

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};

connectToDB();

module.exports = { sequelize };
