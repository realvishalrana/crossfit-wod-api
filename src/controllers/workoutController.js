const workoutService = require("../services/workout");

const getAllWorkouts = async (req, res) => {
  const allWorkouts = await workoutService.getAllWorkouts(req, res);
  res.send({ status: "OK", data: allWorkouts, message: "Workouts found" });
};

const getOneWorkout = async (req, res) => {
  const workout = await workoutService.getOneWorkout(req.params.workoutId);
  res
    .status(201)
    .send({ status: "OK", data: workout, message: "Workout found" });
};

const createNewWorkout = async (req, res) => {
  const createdWorkout = await workoutService.createNewWorkout(req.body);
  res.status(201).send({
    status: "OK",
    data: createdWorkout,
    message: "Workout created successfully",
  });
};

const updateOneWorkout = async (req, res) => {
  const updatedWorkout = await workoutService.updateOneWorkout(
    req.params.workoutId,
    req.body
  );
  res.status(201).send({
    status: "OK",
    data: updatedWorkout,
    message: "Workout updated successfully",
  });
};

const deleteOneWorkout = async (req, res) => {
  const deleteWorkOut = await workoutService.deleteOneWorkout(
    req.params.workoutId
  );
  res.status(201).send({
    status: "OK",
    data: deleteWorkOut,
    message: "Workout deleted successfully",
  });
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
