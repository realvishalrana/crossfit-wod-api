const trainingTip = require("../services/trainingTip");
const utils = require("../utils/messages");
class TrainingTipController {
  async getAllTrainingTip(req, res) {
    try {
      const result = await trainingTip.getAllTrainingTip();
      res.message = "Training Tip Data found";
      return utils.successResponse(result, res);
    } catch (error) {
      return utils.failureResponse(error, res);
    }
  }

  async getOneTrainingTip(req, res) {
    try {
      const result = await trainingTip.getOneTrainingTip(
        req.params.trainingTipId
      );
      res.message = "Training Tip Data found";
      return utils.successResponse(result, res);
    } catch (error) {
      return utils.failureResponse(error, res);
    }
  }

  async createTrainingTip(req, res) {
    try {
      const result = await trainingTip.createTrainingTip(req.body);
      res.message = "Created Training Tip successfully";
      return utils.successResponse(result, res);
    } catch (error) {
      return utils.failureResponse(error, res);
    }
  }
  async updateTrainingTip(req, res) {
    try {
      const result = await trainingTip.updateTrainingTip(
        req.params.trainingTipId,
        req.body
      );
      res.message = "Updated Training Tip successfully";
      return utils.successResponse(result, res);
    } catch (error) {
      return utils.failureResponse(error, res);
    }
  }
  async deleteTrainingTip(req, res) {
    try {
      const result = await trainingTip.deleteTrainingTip(
        req.params.trainingTipId
      );
      res.message = "Deleted Training Tip successfully";
      return utils.successResponse(result, res);
    } catch (error) {
      return utils.failureResponse(error, res);
    }
  }
}

module.exports = new TrainingTipController();
