const mongoose = require("mongoose");

// WOD (Workout of the Day)
const WodScheama = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: ["For Time", "AMRAP", "EMOM", "Tabata", "Strength"],
      required: true,
    },
    exercises: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "At least one exercise is required",
      },
    },
    equipment: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

const WodModal = mongoose.modal("Wod", WodScheama);

module.exports = WodModal;
