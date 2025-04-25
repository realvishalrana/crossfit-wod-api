const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/auth");
const trainingTip = require("../controllers/trainingTip");
const validate = require("../middleware/validate");
const trainingTipValidation = require("../utils/validation/trainingTip");

router.use(authMiddleware);

router.get("/", trainingTip.getAllTrainingTip);

router.get("/:trainingTipId", trainingTip.getOneTrainingTip);

router.post(
  "/",
  validate(trainingTipValidation.createSchema),
  trainingTip.createTrainingTip
);

router.put(
  "/:trainingTipId",
  validate(trainingTipValidation.updateSchema),

  trainingTip.updateTrainingTip
);

router.delete("/:trainingTipId", trainingTip.deleteTrainingTip);

module.exports = router;
