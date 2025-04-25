const joi = require("joi");

const createWorkoutSchema = joi.object({
  name: joi.string().required(),
  mode: joi.string().required(),
  equipment: joi.array().required().min(1),
  exercises: joi.array().required().min(1),
  userId: joi.string().required(),
});

const updateWorkoutSchema = joi.object({
  name: joi.string().optional(),
  mode: joi.string().optional(),
  equipment: joi.array().optional(),
  exercises: joi.array().optional(),
  userId: joi.string().optional(),
});

const deleteWorkoutSchema = joi.object({
  id: joi.string().required().messages({
    "any.required": "The workout ID is required to delete a workout.",
    "string.empty": "The workout ID cannot be empty.",
    "string.base": "The workout ID must be a string.",
  }),
});

module.exports = {
  createWorkoutSchema,
  updateWorkoutSchema,
  deleteWorkoutSchema,
};
