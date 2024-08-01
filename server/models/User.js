const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Must be a valid email",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isValidPassword(value) {
          const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          if (!passwordRegex.test(value)) {
            throw new Error(
              "Password must have at least one lowercase letter, one uppercase letter, one numeric value, and one special character"
            );
          }
        },
      },
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = { User };
