const responseStatusCode = require("./responseCode");
const reloadVersion = process.env.FRONT_RELOAD_VERSION
  ? parseInt(process.env.FRONT_RELOAD_VERSION)
  : 1;

exports.successResponse = (
  data,
  res,
  statusCode = responseStatusCode.success
) => {
  return res.status(statusCode).json({
    STATUS: "SUCCESS",
    MESSAGE: res.message
      ? res.message
      : "Your request is successfully executed",
    DATA: data,
    reloadVersion: reloadVersion,
  });
};
exports.noDataResponse = (res, statusCode = responseStatusCode.success) => {
  return res.status(statusCode).json({
    STATUS: "SUCCESS",
    MESSAGE: res.message
      ? res.message
      : "Your request is successfully executed",
    reloadVersion: reloadVersion,
  });
};

exports.changePasswordResponse = ({}, res) => {
  return res.status(responseStatusCode.success).json({
    STATUS: "SUCCESS",
    MESSAGE: res.message
      ? res.message
      : "Password has been changed successfully.",
    reloadVersion: reloadVersion,
  });
};
exports.updateProfileResponse = ({ data, res, message }) => {
  return res.status(responseStatusCode.success).json({
    STATUS: "SUCCESS",
    MESSAGE: message || "Your profile is successfully updated",
    DATA: data,
    reloadVersion: reloadVersion,
  });
};
exports.failureResponse = (error, res, statusCode = 400) => {
  let message = "Something went wrong";

  if (error?.message) message = error.message;
  if (error?.name === "ValidationError" && error.errors) {
    const errorMessages = Object.values(error.errors).map((err) => err.message);
    message = errorMessages[0] || message;
    statusCode = 422;
  }
  if (error?.name === "CastError") {
    message = `Invalid ${error.path}: ${error.value}`;
  }
  if (error?.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0];
    message = `Duplicate value for field: ${field}`;
  }

  return res.status(statusCode).json({
    STATUS: "FAILURE",
    MESSAGE: message,
    reloadVersion,
  });
};

exports.badRequest = ({ data, res }) => {
  res.MESSAGE = "The request cannot be fulfilled due to bad syntax";
  return res.status(responseStatusCode.validationError).json({
    STATUS: "FAILURE",
    MESSAGE: "The request cannot be fulfilled due to bad syntax",
    DATA: data,
    reloadVersion: reloadVersion,
  });
};
exports.isDuplicate = ({ data, res }) => {
  res.MESSAGE = "already exists";
  return res.status(responseStatusCode.validationError).json({
    STATUS: "FAILURE",
    MESSAGE: "already exists",
    DATA: data,
    reloadVersion: reloadVersion,
  });
};
exports.recordNotFound = ({ data, res }) => {
  res.MESSAGE = "Record not found with specified criteria.";
  return res.status(responseStatusCode.validationError).json({
    STATUS: "FAILURE",
    MESSAGE: "Record not found with specified criteria.",
    reloadVersion: reloadVersion,
  });
};
exports.insufficientParameters = ({ res }) => {
  res.MESSAGE = "Insufficient parameters";
  return res.status(responseStatusCode.badRequest).json({
    STATUS: "FAILURE",
    MESSAGE: "Insufficient parameters",
    reloadVersion: reloadVersion,
  });
};

exports.notFound = ({ err, res }) => {
  res.MESSAGE =
    "The requested resource could not be found but may be available again in the future";
  return res.status(responseStatusCode.validationError).json({
    STATUS: "FAILURE",
    MESSAGE: err,
    reloadVersion: reloadVersion,
  });
};

exports.mongoError = ({ err, res }) => {
  res.MESSAGE = "Mongo db related error";
  return res.status(responseStatusCode.validationError).json({
    STATUS: "FAILURE",
    MESSAGE: "Mongo db related error",
    reloadVersion: reloadVersion,
  });
};
exports.inValidParam = (message, res) => {
  message = message.replace(/\"/g, "");
  res.MESSAGE = message;
  return res.status(responseStatusCode.validationError).json({
    STATUS: "FAILURE",
    MESSAGE: message,
    reloadVersion: reloadVersion,
  });
};

exports.unAuthorizedRequest = (res) => {
  // res.MESSAGE = 'You are not authorized to access the request';
  return res.status(responseStatusCode.unAuthorizedRequest).json({
    STATUS: "FAILURE",
    MESSAGE: res.message,
    reloadVersion: reloadVersion,
  });
};

exports.unAuthorized = (res) => {
  return res.status(responseStatusCode.unAuthorized).json({
    STATUS: "FAILURE",
    MESSAGE: res.message,
    reloadVersion: reloadVersion,
  });
};

exports.emailPhoneVerify = (result, res) => {
  return res.status(responseStatusCode.success).json({
    STATUS: "SUCCESS",
    MESSAGE: `Welcome back to ${res.domainName}`,
    DATA: result,
    reloadVersion: reloadVersion,
  });
};
exports.loginSuccess = (result, res) => {
  return res.status(responseStatusCode.success).json({
    STATUS: "SUCCESS",
    MESSAGE: `Welcome back to ${res.domainName}`,
    DATA: result,
    reloadVersion: reloadVersion,
  });
};

exports.verifyEmail = (result, res) => {
  res.MESSAGE = "OTP verified Successfully";
  return res.status(responseStatusCode.success).json({
    STATUS: "FAILURE",
    MESSAGE: res.message,
    DATA: result.token ? result : { message: result },
    reloadVersion: reloadVersion,
  });
};

exports.passwordEmailWrong = (res) => {
  res.MESSAGE = "email or password may be wrong";
  return res.status(responseStatusCode.unAuthorizedRequest).json({
    STATUS: "FAILURE",
    MESSAGE: "email or password may be wrong",
    reloadVersion: reloadVersion,
  });
};

exports.loginFailed = (error, res) => {
  res.MESSAGE = error.message.split(": ")[1];
  return res.status(responseStatusCode.validationError).json({
    STATUS: "FAILURE",
    MESSAGE: res.MESSAGE,
    reloadVersion: reloadVersion,
  });
};
exports.failedSoftDelete = (res) => {
  res.MESSAGE = "Data can not be soft delete due to internal server error";
  return res.status(responseStatusCode.validationError).json({
    STATUS: "FAILURE",
    MESSAGE: "Data can not be soft delete due to internal server error",
    reloadVersion: reloadVersion,
  });
};
exports.userNotFound = (res) => {
  res.MESSAGE = "User not found";
  return res.status(responseStatusCode.validationError).json({
    STATUS: "FAILURE",
    MESSAGE: "User not found",
    reloadVersion: reloadVersion,
  });
};
exports.emailNotVerified = (res) => {
  res.MESSAGE = "Your email is not verified";
  return res.status(responseStatusCode.validationError).json({
    STATUS: "FAILURE",
    MESSAGE: "Your email is not verified",
    reloadVersion: reloadVersion,
  });
};

exports.logout = (res) => {
  return res.status(responseStatusCode.success).json({
    STATUS: "SUCCESS",
    MESSAGE: res.message ? res.message : "Logout Successful",
    reloadVersion: reloadVersion,
  });
};
