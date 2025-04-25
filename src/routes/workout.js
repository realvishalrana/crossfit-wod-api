const express = require("express");
const workoutController = require("../controllers/workoutController");
const authMiddleware = require("../middleware/auth");
const workoutValidation = require("../utils/validation/workout");
const validate = require("../middleware/validate");

const router = express.Router();

router.use(authMiddleware);

router.get("/", workoutController.getAllWorkouts);

router.get("/:workoutId", workoutController.getOneWorkout);

router.post(
  "/",
  validate(workoutValidation.createWorkoutSchema),
  workoutController.createNewWorkout
);

router.put(
  "/:workoutId",
  validate(workoutValidation.updateWorkoutSchema),
  workoutController.updateOneWorkout
);

router.delete(
  "/:workoutId",
  validate(workoutValidation.deleteWorkoutSchema),
  workoutController.deleteOneWorkout
);

module.exports = router;
