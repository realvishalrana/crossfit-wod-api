const joi = require("joi");

const userSchema = joi.object({
  email: joi.string().required(),
  password: joi
    .string()
    .pattern(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one special character.",
    }),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
});

const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const deleteSchema = joi.object({
  id: joi.string().required().messages({
    "any.required": "The user ID is required to delete a user.",
    "string.empty": "The user ID cannot be empty.",
    "string.base": "The user ID must be a string.",
  }),
});

const resetPasswordSchema = joi.object({
  email: joi.string().required(),
  password: joi
    .string()
    .pattern(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one special character.",
    }),
});

const updateSchema = joi.object({
  id: joi.string().required().messages({
    "any.required": "The user ID is required to update a user.",
    "string.empty": "The user ID cannot be empty.",
    "string.base": "The user ID must be a string.",
  }),
  email: joi.string().optional(),
  firstName: joi.string().optional(),
  lastName: joi.string().optional(),
});

module.exports = {
  userSchema,
  loginSchema,
  deleteSchema,
  resetPasswordSchema,
  updateSchema,
};
