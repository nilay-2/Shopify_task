const Joi = require("joi");

exports.productSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().uri().required(),
  price: Joi.number().positive().required(),
  category: Joi.string().required(),
  rating: Joi.object({
    rate: Joi.number().positive().required(),
    count: Joi.number().positive().required(),
  }).required(),
});
