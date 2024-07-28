const { Cart } = require("../models/Cart");
const ErrorResponse = require("../utils/ErrorResponse");
const { productSchema } = require("../Schemas/productValidation");
exports.addToCart = async (req, res) => {
  try {
    const { prodId } = req.params;

    const userId = req.user.id;

    // console.log(req.body);

    const validationStatus = productSchema.validate(req.body);

    if (validationStatus.error) {
      throw new ErrorResponse("Bad Request", 400);
    }

    const item = validationStatus.value;

    const prod = await Cart.create({
      productId: prodId,
      userId: userId,
      ...item,
    });

    if (!prod) {
      throw new ErrorResponse(
        "Add to cart failed, please try again later",
        500
      );
    }

    res.status(200).json({
      status: "success",
      message: "Added to cart",
    });
  } catch (error) {
    console.log(error.name);
    const statusCode = error.statusCode || 500;

    if (error.name === "SequelizeUniqueConstraintError") {
      error.message = "This item is already in the cart";
    }

    res.status(statusCode).json({
      status: "failure",
      error: error.message,
    });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;

    // console.log(userId);

    const cart = await Cart.findAll({
      where: { userId: userId },
    });

    console.log(cart);
    if (!cart || !cart.length) {
      throw new ErrorResponse("Cart is empty", 204);
    }

    res.status(200).json({
      status: "success",
      message: `Cart items of user with id: ${userId}`,
      data: {
        cart: cart,
      },
    });
  } catch (error) {
    console.log(error);
    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
      status: "failure",
      error: error.message,
    });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { prodId } = req.params;

    await Cart.destroy({
      where: {
        productId: prodId,
        userId: userId,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Item removed from cart",
    });
  } catch (error) {
    console.log(error);
    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
      status: "failure",
      error: error.message,
    });
  }
};
