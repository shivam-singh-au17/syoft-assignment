const Joi = require("joi");

module.exports = {
  create: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    inventoryCount: Joi.number().required(),
  }),

  update: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    inventoryCount: Joi.number().required(),
  }),
};
