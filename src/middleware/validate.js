const utils = require("../utils/messages");

const validate = (validator) => {
  return async function (req, res, next) {
    try {
      req.body = await validator.validateAsync(req.body, {
        abortEarly: false,
      });

      next();
    } catch (err) {
      if (err.isJoi) {
        return utils.inValidParam(err.message, res);
      }
      return utils.failureResponse(err, res);
    }
  };
};

module.exports = validate;
