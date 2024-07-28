const express = require("express");
const { verifyToken } = require("../controllers/authControllers");
const {
  addToCart,
  getCartItems,
  removeItem,
} = require("../controllers/cartControllers");

const cartRouter = express.Router();

cartRouter.use(verifyToken);

cartRouter.route("/product/:prodId/addtocart").post(addToCart);

cartRouter.route("/getallitems").get(getCartItems);

cartRouter.route("/product/:prodId/remove").delete(removeItem);

module.exports = cartRouter;
