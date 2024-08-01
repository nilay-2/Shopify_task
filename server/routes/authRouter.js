const express = require("express");
const {
  signUp,
  login,
  verifyToken,
  isLoggedIn,
} = require("../controllers/authControllers");
const authRouter = express.Router();

authRouter.route("/signup").post(signUp);
authRouter.route("/login").post(login);
// authRouter.route("/isloggedin").get(verifyToken, isLoggedIn);

module.exports = authRouter;
