const Joi = require("joi");

exports.authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .min(4)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
});
