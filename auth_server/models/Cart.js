const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const { User } = require("../models/User");

const Cart = sequelize.define(
  "Cart",
  {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      references: {
        model: User,
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {
        rate: 0,
        count: 0,
      },
    },
  },
  {
    tableName: "cart",
    timestamps: true,
  }
);

User.hasMany(Cart, {
  foreignKey: "userId",
});

Cart.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = { Cart };
