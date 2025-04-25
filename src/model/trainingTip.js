const mongoose = require("mongoose");

const trainingTipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    wodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wod",
      required: true,
    },
    userId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const trainingTip = mongoose.model("trainingTip", trainingTipSchema);

module.exports = trainingTip;
