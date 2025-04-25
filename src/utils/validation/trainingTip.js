const joi = require("joi");
const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const createSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  wodId: joi.string().pattern(objectIdPattern).required(),
  userId: joi
    .array()
    .items(joi.string().pattern(objectIdPattern))
    .min(1)
    .required(),
});

const updateSchema = joi.object({
  title: joi.string(),
  description: joi.string(),
  wodId: joi.string().pattern(objectIdPattern),
  userId: joi.array().items(joi.string().pattern(objectIdPattern)),
});
module.exports = {
  createSchema,
  updateSchema,
};
