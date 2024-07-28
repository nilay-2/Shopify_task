const ErrorResponse = require("../utils/ErrorResponse");
const { User } = require("../models/User");
const jwtToken = require("jsonwebtoken");
const { authSchema } = require("../Schemas/userValidation");

// jwt token generation
const generateToken = (email, password, id) => {
  const token = jwtToken.sign({ email, password, id }, "jwtsecret", {
    expiresIn: "2d",
  });
  return token;
};

exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const validationStatus = authSchema.validate(req.body);

    if (validationStatus.error) {
      throw new ErrorResponse("Email or password is in incorrect format", 400);
    }

    const user = await User.findOne({ where: { email: email } });

    if (user) {
      throw new ErrorResponse("User already exists, please login", 400);
    }

    const newUser = await User.create({ email, password });

    const userObj = newUser.toJSON();

    const token = generateToken(userObj.email, userObj.password, userObj.id);

    res
      .cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        // sameSite: 'none' use this attribute only when secure: true (https)
      })
      .status(200)
      .json({
        status: "success",
        message: "Registered successfully",
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validationStatus = authSchema.validate(req.body);

    if (validationStatus.error) {
      throw new ErrorResponse("Email and password incorrect", 400);
    }

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new ErrorResponse(
        `${email} not found, plase create an account`,
        404
      );
    }

    const userObj = user.toJSON();

    if (userObj.password !== password) {
      throw new ErrorResponse("Password is incorrect", 401);
    }

    const token = generateToken(userObj.email, userObj.password, userObj.id);

    res
      .cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        // path: "/",
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({
        status: "success",
        message: "Login successfull",
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

exports.verifyToken = async (req, res, next) => {
  try {
    const { jwt } = req.cookies;

    // console.log(jwt);

    if (!jwt) {
      throw new ErrorResponse("Authentication failed, please login again", 400);
    }

    const decodedUser = jwtToken.verify(jwt, "jwtsecret");

    // console.log(decodedUser);

    if (!decodedUser) {
      throw new ErrorResponse("Session expired", 401);
    }

    const user = await User.findOne({
      where: {
        email: decodedUser.email,
      },
    });

    if (!user) {
      throw new ErrorResponse(
        `${email} not found, please create an account`,
        404
      );
    }

    req.user = user.toJSON();

    next();
  } catch (error) {
    console.log(error);

    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
      status: "failure",
      error: error.message,
    });
  }
};
