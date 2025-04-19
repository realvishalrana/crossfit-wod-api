const mongoose = require("mongoose"); // Make sure you have mongoose

const validate = (validator) => {
  return async function (req, res, next) {
    try {
      // Validate the request body using Joi
      const validatedData = await validator.validateAsync(req.body, {
        abortEarly: false,
      });
      req.body = validatedData;

      if (validatedData?.id) {
        if (!mongoose.Types.ObjectId.isValid(validatedData.id)) {
          return res
            .status(400)
            .json({ STATUS: "FAILURE", MESSAGE: "Invalid User ID format" });
        }
      }

      next();
    } catch (err) {
      let message = err.message.replace(/\"/g, "");
      if (err.isJoi) {
        return res.status(400).json({
          STATUS: "FAILURE",
          MESSAGE: message,
        });
      }
      next(err);
    }
  };
};

module.exports = validate;
