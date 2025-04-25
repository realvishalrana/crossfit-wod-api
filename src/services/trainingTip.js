const trainingTipModal = require("../model/trainingTip");

const getAllTrainingTip = async () => {
  const result = await trainingTipModal.find({}).lean();
  return result;
};
const getOneTrainingTip = async (id) => {
  const result = await trainingTipModal.findById(id);
  if (!result) {
    throw new Error("Training Tip not found");
  }
  return result;
};

const createTrainingTip = async (trainingBody) => {
  const data = await trainingTipModal.create(trainingBody);
  return data;
};
const updateTrainingTip = async (trainingTipId, body) => {
  const data = await trainingTipModal.findByIdAndUpdate(trainingTipId, body, {
    new: true,
  });
  if (!data) {
    const error = new Error("Training Tip not found");
    throw error;
  }
  return data;
};
const deleteTrainingTip = async (trainingTipId) => {
  const data = await trainingTipModal.findByIdAndDelete(trainingTipId);
  if (!data) {
    throw new Error("Training Tip not found");
  }
  return data;
};

module.exports = {
  getAllTrainingTip,
  getOneTrainingTip,
  createTrainingTip,
  updateTrainingTip,
  deleteTrainingTip,
};
