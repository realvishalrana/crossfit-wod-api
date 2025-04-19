const mongoose = require("mongoose");

const trainingTipScheam = new mongoose.Schema(
  {
    context: {
      type: String,
      required: true,
    },
    wodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wod",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const trainingTip = mongoose.model("trainingTip", trainingTipScheam);

module.exports = trainingTip;
